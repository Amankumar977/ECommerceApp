import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../model/orderModel.js";
let newCreatedOrderProductId;
const createMongooseOrder = async (orderDetails) => {
  const order = await orderModel.create(orderDetails);
  newCreatedOrderProductId = order._id;
};
export async function handleStripeCheckOut(req, res) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { products, discountedPercentage, orderDetails } = req.body;
    await createMongooseOrder(orderDetails);
    // Create the coupon
    const coupon = await stripe.coupons.create({
      percent_off: discountedPercentage,
      duration: "once",
    });
    // Map products to line items
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "INR", // Ensure the currency is set to INR
        product_data: {
          name: product.name,
          images: [product.images[0]],
        },
        unit_amount: Math.round(product.discountedPrice * 100),
      },
      quantity: product.quantity,
    }));

    // Create the checkout session with the coupon and required billing address collection
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/orderSuccess`,
      cancel_url: `${process.env.FRONTEND_URL}/unsucessfullOrder`,
      discounts: [{ coupon: coupon.id }], // Use the coupon ID
      billing_address_collection: "required", // Require customer to provide billing address
    });
    if (session) {
      res.status(200).json({
        id: session.id,
      });
    }
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
  timeout: 60000, // Set a timeout value to handle network delays
});

export async function handleRazorpayPayment(req, res) {
  try {
    const { finalPaymentPrice, orderDetails } = req.body;
    await createMongooseOrder(orderDetails);
    const options = {
      amount: finalPaymentPrice * 100, // Convert to paise
      currency: "INR",
      payment_capture: 1,
    };
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Your payment verification endpoint remains the same
export async function handleRazorpayPaymentVerification(req, res) {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  let expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    const order = await orderModel.findByIdAndUpdate(newCreatedOrderProductId, {
      PaymentStatus: "Recieved",
    });
    res.redirect(`${process.env.FRONTEND_URL}/orderSuccess`);
  } else {
    res.redirect(`${process.env.FRONTEND_URL}/unsucessfullOrder`);
  }
}

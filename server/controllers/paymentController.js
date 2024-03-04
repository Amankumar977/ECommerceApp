import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../model/orderModel.js";
import productModel from "../model/productModel.js";
let newCreatedOrderProductsId = [];
const createMongooseOrder = async (orderDetails) => {
  let products = orderDetails.products;
  let orderMap = new Map();
  for (let item of products) {
    let shopId = item.shopId;
    if (!orderMap.has(shopId)) {
      orderMap.set(shopId, [item]);
    } else {
      orderMap.get(shopId).push(item);
    }
  }
  for (let [shopId, products] of orderMap.entries()) {
    const finalPaymentPrice = products.reduce(
      (total, item) => total + item.discountedPrice,
      0
    );
    for (let product of products) {
      let item = await productModel.findById(product._id);
      item.sold_out += 1;
      item.stock -= 1;
      item.save();
    }
    let finalOrder = {
      name: orderDetails.name,
      email: orderDetails.email,
      shippingInfo: orderDetails.shippingInfo,
      phoneNumber: orderDetails.phoneNumber,
      finalPaymentPrice: finalPaymentPrice,
      discount: orderDetails.discount,
      shippingCharges: orderDetails.shippingCharges,
      customerId: orderDetails.customerId,
      PaymentType: orderDetails.PaymentType,
      avatar: orderDetails.avatar,
      products,
    };
    const order = await orderModel.create(finalOrder);
    newCreatedOrderProductsId.push(order._id);
  }
};
export async function handleStripeCheckOut(req, res) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { products, discountedPercentage, orderDetails } = req.body;

    // Create the coupon
    const coupon = await stripe.coupons.create({
      percent_off: discountedPercentage,
      duration: "once",
    });

    // Map products to line items
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "INR",
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
      billing_address_collection: "required",
    });

    if (session) {
      // Loop through products to update stock and create orders
      for (let product of products) {
        const item = await productModel.findById(product._id);
        if (!item) {
          throw new Error(`Product not found: ${product._id}`);
        }
        item.sold_out += 1;
        item.stock -= 1;
        await item.save();
      }

      // Calculate final payment price
      const finalPaymentPrice = products.reduce(
        (total, item) => total + item.discountedPrice * item.quantity,
        0
      );

      // Create the final order
      const finalOrder = {
        name: orderDetails.name,
        email: orderDetails.email,
        shippingInfo: orderDetails.shippingInfo,
        phoneNumber: orderDetails.phoneNumber,
        finalPaymentPrice: finalPaymentPrice,
        discount: orderDetails.discount,
        shippingCharges: orderDetails.shippingCharges,
        customerId: orderDetails.customerId,
        PaymentType: orderDetails.PaymentType,
        products: products,
        PaymentStatus: "Received",
      };

      // Save the order
      const order = await orderModel.create(finalOrder);
      newCreatedOrderProductsId.push(order._id);

      // Return the session ID to the frontend
      res.status(200).json({
        id: session.id,
      });
    }
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: `Internal Server Error ${error.message}` });
  }
}

/**Razorpay start */
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
    for (let id of newCreatedOrderProductsId) {
      await orderModel.findByIdAndUpdate(id, {
        PaymentStatus: "Received",
      });
    }
    res.redirect(`${process.env.FRONTEND_URL}/orderSuccess`);
  } else {
    res.redirect(`${process.env.FRONTEND_URL}/unsucessfullOrder`);
  }
}

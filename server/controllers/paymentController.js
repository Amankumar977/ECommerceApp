import Stripe from "stripe";

export async function handleStripeCheckOut(req, res) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { products, discountedPercentage } = req.body;

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

    res.status(200).json({
      id: session.id,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

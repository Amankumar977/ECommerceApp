import orderModel from "../model/orderModel.js";
export async function handleCreateOrder(req, res) {
  try {
    const orderDetails = req.body;
    if (!orderDetails) {
      return res.status(400).json({
        success: false,
        message: "Please provide the order details",
      });
    }
    const order = await orderModel.create(orderDetails);
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Cannot create order",
      });
    }
    return res.status(200).json({
      success: true,
      message: "order created",
      order: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Interal server error ${error.message}`,
    });
  }
}

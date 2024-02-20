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
    let orderMap = new Map();
    let products = orderDetails.products;
    for (let item of products) {
      let shopId = item.shopId;
      if (!orderMap.has(shopId)) {
        orderMap.set(shopId, [item]);
      } else {
        orderMap.get(shopId).push(item);
      }
    }
    const orders = [];
    for (let [shopId, products] of orderMap.entries()) {
      const finalPaymentPrice = products.reduce(
        (total, item) => total + item.discountedPrice,
        0
      );
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
        products,
      };
      const order = await orderModel.create(finalOrder);
      orders.push(order._id);
    }

    return res.status(200).json({
      success: true,
      message: "order created",
      order: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Interal server error ${error.message}`,
    });
  }
}
export async function handleGetUserOrder(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: `Please provide the id`,
      });
    }
    const order = await orderModel.find({ customerId: id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No order found with the id`,
      });
    }

    const orders = order.filter(
      (order) =>
        order.PaymentType === "COD" || order.PaymentStatus == "Received"
    );

    return res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Erron while fetching the data ${error.message}`,
    });
  }
}
export async function handleGetShopOrder(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: `Please provide the id`,
      });
    }
    const order = await orderModel.find({ "products.shopId": id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No order found with the id`,
      });
    }

    const orders = order.filter(
      (order) =>
        order.PaymentType === "COD" || order.PaymentStatus == "Received"
    );

    return res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Erron while fetching the data ${error.message}`,
    });
  }
}

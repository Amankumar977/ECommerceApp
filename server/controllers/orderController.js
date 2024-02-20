import orderModel from "../model/orderModel.js";
import productModel from "../model/productModel.js";
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
      console.log(orderDetails);
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
export async function handlegetOrderDetails(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide the necessary details like id.",
      });
    }
    const orderDetail = await orderModel.findById(id);
    if (!orderDetail) {
      return res.status(404).json({
        success: false,
        message: "The order is found, please try for another order.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Sucesfully fatched the details",
      order: orderDetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function handleSubmitReview(req, res) {
  try {
    const {
      productId,
      orderId,
      customerName,
      customerAvatar,
      review,
      ratings,
    } = req.body;
    if (
      !productId ||
      !orderId ||
      !customerName ||
      !customerAvatar ||
      !review ||
      !ratings
    ) {
      return res.status(400).json({
        success: false,
        message: `Please provide the required details to submit the review`,
      });
    }

    // Update reviews for each product
    for (const id of productId) {
      await productModel.findByIdAndUpdate(
        id,
        {
          $push: {
            reviews: {
              orderId,
              customerName,
              customerAvatar,
              review,
            },
          },
        },
        { new: true }
      );
    }

    // Update ratings for each product
    for (const id of productId) {
      await productModel.findByIdAndUpdate(
        id,
        {
          $push: { ratings },
        },
        { new: true }
      );
    }

    // Update the order to mark the review as given
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, {
      reviewGiven: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: `Could not able to update the review.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Review Submitted Successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error while submitting the review ${error.message}`,
    });
  }
}
export async function handleUpdateOrderStatus(req, res) {
  try {
    const { selectedStatus, id } = req.body;
    if (!selectedStatus || !id) {
      return res.status(400).json({
        success: false,
        message: "Please select the order status",
      });
    }

    let updateData = { orderStatus: selectedStatus };

    if (selectedStatus === "Delivered") {
      updateData.PaymentStatus = "Received";
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(400).json({
        success: false,
        message: "Error in updating the order please try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order Status updated",
      updatedOrder: updatedOrder, // Optionally, you can send the updated order in the response
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error",
    });
  }
}

import userModel from "../model/userModel.js";
import orderModel from "../model/orderModel.js";
import couponModel from "../model/couponCode.js";
import productModel from "../model/productModel.js";
import eventsModel from "../model/eventModel.js";
import shopModel from "../model/shopModel.js";
export async function handleGetAllAdminData(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide the id",
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this id",
      });
    }
    if (user.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "The user is not a admin",
      });
    }
    const allOrders = await orderModel.find({});
    const allCustomers = await userModel.find({});
    const allCoupons = await couponModel.find({});
    const allEvents = await eventsModel.find({});
    const allShops = await shopModel.find({});
    const allProducts = await productModel.find({});
    const allData = {
      allOrders,
      allCoupons,
      allCustomers,
      allEvents,
      allProducts,
      allShops,
    };
    res.status(200).json({
      success: true,
      allData,
      message: "Fetched all the data",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

import couponModel from "../model/couponCode.js";
export async function handleCreateCoupon(req, res) {
  try {
    const {
      name,
      percentDiscount,
      minAmount,
      shop,
      startDate,
      endDate,
      selectedProduct,
    } = req.body;

    if (!name || !percentDiscount || !shop) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the required fileds",
      });
    }
    const presentCode = await couponModel.findOne({ name: name });
    if (presentCode) {
      return res.status(400).json({
        success: false,
        message:
          "The name of the coupoun code alredy exist please find a new coupoun code.",
      });
    }
    let coupoun = await couponModel.create({
      name,
      percentDiscount,
      minAmount,
      shop,
      startDate,
      endDate,
      selectedProduct,
    });
    if (!coupoun) {
      return res.status(400).json({
        success: false,
        message:
          "Enable to create the coupoun code at this moment please try again later.",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Coupon code created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in coupon creation",
    });
  }
}
export async function handlegetShopCoupon(req, res) {
  try {
    const shopId = req.params.id;
    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the shop Id",
      });
    }
    const allCoupons = await couponModel.find({ "shop._id": shopId });
    if (allCoupons.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Coupon Found",
      });
    }
    return res.status(200).json({
      success: true,
      coupons: allCoupons,
      message: `Total ${allCoupons.length} coupons found`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error",
    });
  }
}
export async function handleDeleteCoupon(req, res) {
  try {
    const couponId = req.params.id;
    if (!couponId) {
      return res.status(400).json({
        success: false,
        message: "Please Provide the shop Id",
      });
    }
    const isCouponDeleted = await couponModel.findByIdAndDelete(couponId);
    if (!isCouponDeleted) {
      return res.status(404).json({
        success: false,
        message: "coupon not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message:
        "Internal server error while deleting the coupon, please try again later.",
    });
  }
}
export async function handleGetCoupon(req, res) {
  try {
    const couponCode = req.params.couponCode;
    if (!couponCode) {
      return res.status(400).json({
        success: false,
        message: "Please provide a coupon code",
      });
    }
    const existingCoupon = await couponModel.findOne({ name: couponCode });
    if (!existingCoupon) {
      return res.status(404).json({
        success: false,
        message: "No Coupon code found with this name, please check the code",
      });
    }
    return res.status(200).json({
      success: true,
      coupon: existingCoupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: error.message,
    });
  }
}

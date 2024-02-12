import mongoose from "mongoose";
let couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your coupon code name!"],
      unique: true,
    },
    percentDiscount: {
      type: Number,
      required: [true, "Please enter your coupon code discount percentage!"],
    },
    minAmount: {
      type: Number,
    },
    shop: {
      type: Object,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    selectedProduct: {
      type: String,
    },
  },
  { timestamps: true }
);
let couponModel = mongoose.model("coupoun", couponSchema);
export default couponModel;

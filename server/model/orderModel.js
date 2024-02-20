import mongoose from "mongoose";
let orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    shippingInfo: {
      type: Object,
      required: true,
    },
    finalPaymentPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    shippingCharges: {
      type: Number,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    PaymentType: {
      type: String,
      required: true,
    },
    PaymentStatus: {
      type: String,
      default: "notReceived",
    },
    reviewGiven: {
      type: Boolean,
      default: false,
    },
    orderStatus: {
      type: String,
      default: "Ordered",
    },

    products: [{ type: Object, required: true }],
  },
  { timestamps: true }
);

let orderModel = mongoose.model("orders", orderSchema);
export default orderModel;

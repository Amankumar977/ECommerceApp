import mongoose from "mongoose";
let eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: [true, "Please enter the event product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter the event product description"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please enter the event product category"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Please enter the event product Start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please enter the event product end date"],
    },
    tags: {
      type: String,
      required: [true, "Please enter the event product tags"],
      trim: true,
    },
    originalPrice: {
      type: Number,
      required: [true, "Please enter the  event product original Price"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "Please enter the  event product discountPercentage"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter the  event productstock"],
    },
    discountedPrice: {
      type: Number,
      required: [true, "Please enter the event product discountedPrice"],
    },
    shopId: {
      type: String,
      required: true,
    },
    shop: {
      type: Object,
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Running",
    },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);
let eventModel = mongoose.model("events", eventSchema);
export default eventModel;

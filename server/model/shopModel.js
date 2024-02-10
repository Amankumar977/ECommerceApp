import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
let shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        "Please Enter a correct email",
      ],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Please enter a valid password",
      ],
      minLength: [4, "Password should be greater than 4 characters"],
      select: false,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "seller",
    },
  },
  { timestamps: true }
);
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    return next(error);
  }
});
shopSchema.methods = {
  getJwtToken() {
    return Jwt.sign({ id: this._id }, process.env.SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  },
  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },
};

let shopModel = mongoose.model("Shop", shopSchema);
export default shopModel;

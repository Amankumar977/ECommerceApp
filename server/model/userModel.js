// Import necessary modules and libraries
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: [true, "The email must be unique"],
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        "Please enter a valid email",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Please enter a valid password",
      ],
      minLength: [4, "Password should be greater than 4 characters"],
      select: false,
    },
    phoneNumber: {
      type: Number,
    },
    address: [
      {
        country: {
          type: String,
        },
        city: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        addressTpe: {
          type: String,
        },
      },
    ],
    role: {
      type: String,
      default: "user",
    },
    avatar: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

// Define user schema methods
userSchema.methods = {
  getJwtToken() {
    // Use the secure secret key from environment variables
    const secretKey = process.env.SECRET;

    if (!secretKey) {
      throw new Error("Missing JWT secret key");
    }

    // Create a payload with a unique identifier (e.g., user ID or email)
    const payload = {
      id: this._id,
    };

    return jwt.sign(payload, secretKey, { expiresIn: process.env.JWT_EXPIRY });
  },
  comparePassword: async function (password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  },
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // Hash the password with a salt factor of 10
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});
// Create user model
let userModel = mongoose.model("User", userSchema);

// Export the user model
export default userModel;

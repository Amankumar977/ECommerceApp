// Import necessary modules and libraries
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
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
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

// Define user schema methods
userSchema.methods = {
  jwtToken() {
    // Use the secure secret key from environment variables
    const secretKey = process.env.SECRET;

    if (!secretKey) {
      throw new Error("Missing JWT secret key");
    }

    // Create a payload with a unique identifier (e.g., user ID or email)
    const payload = {
      userId: this._id,
    };

    return jwt.sign(payload, secretKey, { expiresIn: process.env.JWT_EXPIRY });
  },
  comparePassword: async function (password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  },
};

// Create user model
let userModel = mongoose.model("user", userSchema);

// Export the user model
export default userModel;

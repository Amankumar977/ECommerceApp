import mongoose from "mongoose";
import JWT from "jsonwebtoken";
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
userSchema.methods = {
  jwtToken() {
    return JWT.sign(
      {
        id: this.id,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
  },
};
let userModel = mongoose.model("user", userSchema);
export default userModel;

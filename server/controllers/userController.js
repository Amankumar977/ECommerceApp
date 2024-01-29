// Import necessary modules and libraries
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import multer from "multer";

export async function handleRegisterUser(req, res) {
  try {
    const body = req.body;
    const { name, email, password } = req.body;

    // Check for required fields
    if (!body || !body.email || !body.password || !body.name) {
      return res.status(500).json({
        success: false,
        msg: "Please Enter the required field",
      });
    }

    try {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        email,
        name,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = await user.jwtToken();

      // Set cookie options
      const cookieOption = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      };

      // Set the token in the response cookie
      res.cookie("token", token, cookieOption);
      console.log(token);
      return res.status(201).json({
        success: true,
        msg: "User Created",
        user: user,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(500).json({
          success: false,
          msg: "The email is already registered",
        });
      }
      return res.status(500).json({
        success: false,
        msg: "Error in creating the user",
        err: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server Error",
      err: error.message,
    });
  }
}

export async function handleLoginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
      return res.status(500).json({
        success: false,
        msg: "Please Enter the required field",
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Email is not found",
      });
    }

    // Compare the provided password with the hashed password
    const comparePasswordResult = await user.comparePassword(
      password,
      user.password
    );

    if (!comparePasswordResult) {
      return res.status(401).json({
        success: false,
        msg: "Password is not correct",
      });
    }

    // Clear sensitive information from user object
    user.password = undefined;

    // Generate JWT token
    const token = await user.jwtToken();

    // Set cookie options
    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };

    // Set the token in the response cookie
    res.cookie("token", token, cookieOption);

    return res.status(201).json({
      success: true,
      msg: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server Error",
      err: error.message,
    });
  }
}

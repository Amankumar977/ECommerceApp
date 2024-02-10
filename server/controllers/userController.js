// Import necessary modules and libraries
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import sendToken from "../utils/jwtToken.js";
let createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};
export async function handleRegisterUser(req, res, next) {
  try {
    const body = req.body;
    const { name, email, password } = req.body;
    const avatar = req.file;
    // Check for required fields
    if (!body || !body.email || !body.password || !body.name || !avatar) {
      return res.status(400).json({
        success: false,
        msg: "Please Enter the required field",
      });
    }
    const userEmail = await userModel.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler("user email already register", 400));
    }
    const fileUrl = req.file.path;
    const imageUrl = await uploadOnCloudinary(fileUrl);
    console.log(imageUrl);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: imageUrl,
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;
    try {
      if (!userEmail) {
        await sendMail({
          email: user.email,
          name: user.name,
          activationUrl: activationUrl,
        });
        res.status(201).json({
          success: true,
          message: `Please Check your email ${user.email} to activate your Account`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function handleActivateUser(req, res, next) {
  try {
    const { activation_Token } = req.body;

    // Verify activation token
    let newUser;
    try {
      newUser = jwt.verify(activation_Token, process.env.ACTIVATION_SECRET);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const { name, email, password, avatar } = newUser;
    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exists with this email ",
      });
    }

    // Create new user
    let realUser = await userModel.create({
      name,
      email,
      password,
      avatar,
    });

    // Send token
    sendToken(realUser, 201, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Some error while creating the account",
    });
  }
}

export async function handleLoginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Enter the required field",
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not found",
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
        message: "Password is not correct",
      });
    }

    // Clear sensitive information from user object
    user.password = undefined;

    sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
      err: error.message,
    });
  }
}
export async function handleGetuser(req, res) {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function handleLogoutUser(req, res) {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in logout",
    });
  }
}

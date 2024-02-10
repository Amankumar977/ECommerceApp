import shopModel from "../model/shopModel.js";
import jwt from "jsonwebtoken";
import path from "path";
import sendMail from "../utils/sendMail.js";
import sendShopToken from "../utils/sendShopToken.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import fs from "fs";
const createActivationToken = (seller) => {
  let token = jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
  return token;
};

export async function handleRegisterShop(req, res) {
  try {
    const { phone, name, email, address, zip, password } = req.body;
    const avatar = req.file;
    if (!phone || !name || !email || !address || !zip || !password || !avatar) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the required fields including the file",
      });
    }

    const existingShop = await shopModel.findOne({ name });
    if (existingShop) {
      return res.status(400).json({
        success: false,
        message:
          "Shop name is already registered. Please choose a different name.",
      });
    }

    const existingUser = await shopModel.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User email or phone is already registered",
      });
    }

    const fileUrl = req.file.path;
    if (!fileUrl) {
      console.log("error in uploading the file");
      return;
    }
    const imageUrl = await uploadOnCloudinary(fileUrl);
    const realSeller = {
      phone,
      name,
      email,
      address,
      zip,
      password,
      avatar: imageUrl,
    };

    const activationToken = createActivationToken(realSeller);
    const activationUrl = `${process.env.FRONTEND_URL}/shopActivation/${activationToken}`;

    await sendMail({
      name,
      email,
      activationUrl,
    });

    res.status(200).json({
      success: true,
      message: `Please check the email ${email} to register into the shop.`,
    });
  } catch (error) {
    console.error("Error registering shop:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while registering the shop",
    });
  }
}

export async function handleActivateShop(req, res) {
  try {
    const { activation_Token } = req.body;

    const shopDetails = jwt.verify(
      activation_Token,
      process.env.ACTIVATION_SECRET
    );

    const { name, email, avatar, zip, address, phone, password } = shopDetails;

    const shopDetail = await shopModel.create({
      name,
      email,
      avatar,
      zip,
      address,
      phone,
      password,
    });
    console.log("Reached till here the error is after this");
    sendShopToken(shopDetail, 201, res);
  } catch (error) {
    console.error("Error activating shop:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while activating the shop",
    });
  }
}

export async function handleLoginShop(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the required fileds",
      });
    }
    try {
      let shop = await shopModel.findOne({ email }).select("+password");
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: "Shop Email not found please give a correct email",
        });
      }
      let comparePassword = await shop.comparePassword(password);
      if (!comparePassword) {
        return res.status(400).json({
          success: false,
          message: "Password is not correct, please enter the correct password",
        });
      }
      console.log("here i'm", shop._id);
      sendShopToken(shop, 200, res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function handleGetShop(req, res) {
  try {
    const id = req.sellerId;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Internal server error",
      });
    }
    let shop = await shopModel.findById(id);
    if (!shop) {
      return res.status(400).json({
        success: false,
        error: error.message,
        message: "Shop Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      shop: shop,
      message: "Shop Found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error here",
    });
  }
}

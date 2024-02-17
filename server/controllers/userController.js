// Import necessary modules and libraries
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import uploadOnCloudinary, {
  deleteImagefromCloudinary,
} from "../utils/cloudinary.js";
import sendToken from "../utils/jwtToken.js";
import productModel from "../model/productModel.js";
import mongoose from "mongoose";
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
export async function handleGetAllProducts(req, res) {
  try {
    let allProducts = await productModel.find({});
    if (!allProducts) {
      return res.status(404).json({
        success: false,
        message: "No Products found",
      });
    }
    return res.status(200).json({
      success: true,
      allProducts: allProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error please try again later",
    });
  }
}
export async function handleUpdateUserDetails(req, res) {
  try {
    const { name, email, phoneNumber, userId, isImgChanged } = req.body;

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    if (!name || !email || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "The user with the provided userId is not registered",
      });
    }

    let updatedUser;
    if (isImgChanged === true || isImgChanged === "true") {
      await deleteImagefromCloudinary(user.avatar);
      const imageUrl = await uploadOnCloudinary(req.file.path);
      updatedUser = await userModel.findByIdAndUpdate(
        userId,
        {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          avatar: imageUrl,
        },
        { new: true }
      );
    } else {
      updatedUser = await userModel.findByIdAndUpdate(
        userId,
        {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
        },
        { new: true }
      );
    }
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "Error in updating the details",
      });
    }
    console.log(updatedUser);
    return res.status(202).json({
      success: true,
      updatedUser: updatedUser,
      message: "Details updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: error.message,
    });
  }
}

export async function handleAddAddress(req, res) {
  try {
    const { country, state, city, houseAddress, zipCode, addressType, userId } =
      req.body;

    // Validate request body
    if (
      !country ||
      !state ||
      !city ||
      !houseAddress ||
      !zipCode ||
      !addressType ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    // Retrieve user details including their addresses
    const userDetails = await userModel.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let updatedDetails;
    const existingAddressIndex = userDetails.address.findIndex(
      (addr) => addr.addressType === addressType
    );

    if (existingAddressIndex !== -1) {
      // Update existing address
      const update = {
        $set: {
          [`address.${existingAddressIndex}`]: {
            country,
            state,
            city,
            houseAddress,
            zipCode,
            addressType,
          },
        },
      };

      updatedDetails = await userModel.findByIdAndUpdate(userId, update);
    } else {
      // Add new address
      const update = {
        $push: {
          address: {
            country,
            state,
            city,
            houseAddress,
            zipCode,
            addressType,
          },
        },
      };

      updatedDetails = await userModel.findByIdAndUpdate(userId, update);
    }

    if (!updatedDetails) {
      return res.status(400).json({
        success: false,
        message: "The address couldn't be added, please try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        existingAddressIndex !== -1
          ? "Address updated successfully"
          : "Address added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in adding the address",
    });
  }
}
export async function handleDeleteAddress(req, res) {
  try {
    // Extract userId and addressType from the request body
    const { userId, addressType } = req.body;
    console.log(userId, addressType);
    // Find the user by userId
    const user = await userModel.findById(userId);

    // If user not found, return error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the index of the address to remove
    let indexToRemove = -1;
    for (let i = 0; i < user.address.length; i++) {
      if (user.address[i].addressType === addressType) {
        indexToRemove = i;
        break;
      }
    }

    // If addressType not found, return error
    if (indexToRemove === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found for the specified addressType",
      });
    }

    // Remove the address from the array
    user.address.splice(indexToRemove, 1);

    // Save the updated user document
    await user.save();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Address Deleted Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message, // Optionally include the error message for debugging
    });
  }
}
export async function handleChangePassword(req, res) {
  try {
    const { newPassword, confirmPassword, currentPassword, userId } = req.body;
    if (!newPassword || !confirmPassword || !currentPassword || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "The new and confirmed password are not matching",
      });
    }
    const user = await userModel.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "The user is not found!!!",
      });
    }
    const checkPassword = await user.comparePassword(
      currentPassword,
      user.password
    );

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "The entered current password is incorrect!",
      });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password Changed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

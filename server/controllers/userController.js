import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
export async function handleRegisterUser(req, res) {
  try {
    const body = req.body;
    const { name, email, password } = req.body;
    if (!body || !body.email || !body.password || !body.name) {
      return res.status(500).json({
        success: false,
        msg: "Please Enter the required field",
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        email,
        name,
        password: hashedPassword,
      });
      const token = userModel.jwtToken();
      const cookieOption = {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      };
      res.cookies = ("token", token, cookieOption);
      return res.status(201).json({
        success: true,
        msg: "User Created",
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(500).json({
          success: false,
          msg: "The email is alredy registered",
        });
      }
      return res.status(500).json({
        success: false,
        msg: "error in creating the user",
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
    if (!email || !password) {
      return res.status(500).json({
        success: false,
        msg: "Please Enter the required field",
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

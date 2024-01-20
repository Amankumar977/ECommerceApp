import mongoose from "mongoose";
function connectToDb() {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          msg: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server Error",
    });
  }
}
export default connectToDb;

import jwt from "jsonwebtoken";

let isSellerAuthenticated = (req, res, next) => {
  try {
    const { ShopToken } = req.cookies;
    if (!ShopToken) {
      return res.status(401).json({
        success: false,
        message: "Please Login to continue.",
      });
    }

    // Verify the JWT using the correct token variable and secret
    jwt.verify(ShopToken, process.env.SECRET, (error, decoded) => {
      if (error) {
        // Handle JWT verification errors
        return res.status(401).json({
          success: false,
          message: "Invalid Token",
        });
      } else {
        // Set sellerId on the request object
        req.sellerId = decoded.id;
        // Call the 'next' function to pass control to the next middleware
        next();
      }
    });
  } catch (error) {
    // Handle other errors (e.g., issues with accessing cookies)
    return res.status(401).json({
      success: false,
      error: error.message,
      message: "Please login with the shop info",
    });
  }
};

export default isSellerAuthenticated;

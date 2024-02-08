function sendShopToken(user, statuscode, res) {
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "please provide the correct user",
    });
  }
  let token = user.getJwtToken();
  let cookieoption = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statuscode).cookie("ShopToken", token, cookieoption).json({
    success: true,
    token,
    userId: user._id,
  });
}
export default sendShopToken;

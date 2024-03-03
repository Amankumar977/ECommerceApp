// create token and save in the cookies
const sendToken = (user, statuscode, res) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  console.log(token);
  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
export default sendToken;

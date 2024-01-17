const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const { Error } = require("mongoose");

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  // if the authorization is true and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Find the user based on the id in the JWT
      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});




module.exports = { protectRoute };

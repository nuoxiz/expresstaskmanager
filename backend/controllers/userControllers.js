const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendConfirmationEmail } = require("../email/nodeMailerConfig");
const { sendChangePasswordEmail } = require("../email/changePasswordEmail");

/**
 * @desc Get the goals related to the user
 * @route GET /api/users/me
 * @access Private
 */

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const getUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "No user is associated with this email" });
    throw new Error("No user is associated with this email");
  }
  res.status(200).json(user);
});

/**
 * @desc Register a new user
 * @route POST /api/users/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Check if any field is empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  // Check if the email is already registered
  if (await UserModel.findOne({ email })) {
    res.status(400).json({ message: "Email already registered" });
    throw new Error("Email already registered");
  }
  // Hash the password to protect it in data leakage
  const salt = await bcrypt.genSalt(11);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    confirmationCode: "123",
  });
  const uniqueToken = generateToken(newUser._id);
  updateConfirmationCode(newUser._id, {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    status: newUser.status,
    confirmationCode: uniqueToken,
  });
  // if a user is created then everything is okay
  if (newUser) {
    sendConfirmationEmail(newUser.name, newUser.email, uniqueToken);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: uniqueToken,
      status: newUser.status,
      confirmationCode: uniqueToken,
    });
    return;
  } else {
    res
      .status(400)
      .json({ message: "Invalid user data. Failed to create new user" });
  }
});

/**
 * @desc Login a user
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check whether the email passed in exist in the DB
  const user = await UserModel.findOne({ email: email });
  if (user) {
    if (user.status !== "Active") {
      res
        .status(401)
        .json({ message: "Pending Account. Please Verify Your Email" });
      throw new Error("Pending Account. Please Verify Your Email");
    }
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        status: user.status,
      });
      // res.status(200).json({ message: "You have logged in" });
    } else {
      // send json object so that toast can display the message
      res.status(400).json({ message: "Failed to login: Invalid password" });
      throw new Error("Failed to login: Invalid password");
    }
  } else {
    res.status(400).json({ message: "Failed to login: Invalid credentials" });
    throw new Error("Failed to login: Invalid credentials");
  }
});

/**
 * @desc verify the user and change user status to "Active"
 * @route GET /api/users/confirm/:confirmationCode
 * @access private
 */

const verifyUser = asyncHandler(async (req, res) => {
  const code = req.params.confirmationCode;
  const user = await userModel.findOne({ confirmationCode: code });
  if (!user) {
    res.status(400).json({ message: "User Not Found" });
    throw new Error("User Not Found");
  } else {
    await UserModel.findOneAndUpdate(
      { confirmationCode: code },
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: "Active",
        confirmationCode: code,
      },
      { new: true }
    );
    res.status(200).json({ message: "Updated User Status" });
  }
});

/**
 * @desc change user password
 * @route PUT /api/users/changePassword/:userId
 * @access private
 */
const changePassword = asyncHandler(async (req, res) => {
  const { _id, newPassword } = req.body;
  const user = await UserModel.findById(_id);
  if (!user) {
    res.status(400).json({ message: "User not found" });
    throw new Error("User not found");
  } else {
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const userWithNewPassword = await UserModel.findByIdAndUpdate(
      _id,
      { password: hashedPassword },
      { new: true }
    );
    if (userWithNewPassword) {
      res.status(201).json(userWithNewPassword);
    } else {
      res
        .status(400)
        .json({ message: "Failed to Change Password. Please try again" });
      throw new Error("Failed to Change Password. Please try again");
    }
  }
});

/**
 * @desc send change password email
 * @route GET /api/users/changePassword/:userId
 */
const sendChangePassword = asyncHandler(async (req, res) => {
    const user = req.body
  sendChangePasswordEmail(user.name, user.email, user._id);
});

/**
 * @desc Generate JWT using the userId passed in
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const updateConfirmationCode = asyncHandler(async (userId, newData) => {
  try {
    await UserModel.findByIdAndUpdate(userId, newData, { new: true });
  } catch (error) {}
});

module.exports = {
  getUser,
  registerUser,
  loginUser,
  verifyUser,
  changePassword,
  sendChangePassword,
  getUserByEmail,
};

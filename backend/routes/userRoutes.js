const express = require("express");
const router = express.Router();
const {
  getUser,
  registerUser,
  loginUser,
  verifyUser,
  changePassword,
  sendChangePassword,
  getUserByEmail,
} = require("../controllers/userControllers");
const { protectRoute } = require("../middlewares/authMiddleware");
//GET request to get the data related to the user
router.get("/me", protectRoute, getUser);
// POST request to send the data to the database
router.post("/register", registerUser);
// POST request to send the data to the database
router.post("/login", loginUser);
router.post("/getUser", getUserByEmail);
router.get("/confirm/:confirmationCode", verifyUser);
router.put("/changePassword/:userId", changePassword);
router.post("/changePassword/:userId", sendChangePassword);
module.exports = router;

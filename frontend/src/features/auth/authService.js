import axios from "axios";

const API_URI = "/api/users/";

/**
 * @desc POST HTTP request the server
 * @route POST /api/users/login
 * @access private
 */
const login = async (userDetails) => {
  // userDetails = req.body... which is destructured the backend/controller/userController
  // Sending a POST request to /api/users/login will trigger the path in server.js and the corresponding controller
  const res = await axios.post(API_URI + "login", userDetails);
  if (res.data) {
    // local storage stores string only
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};
/**
 * @desc Log out by removing user from local storage
 */
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("fullTask");
};

/**
 * @desc Register a new user
 * @route POST /api/users/register
 * @access private
 */
const register = async (userData) => {
  const response = await axios.post(API_URI + "register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  }
};

/**
 * @desc verify user and change status to "Active"
 * @route GET /api/users/confirm/confirmationCode
 * @access private
 */
const verifyUser = async (confirmationCode) => {
  const res = await axios.get(API_URI + "confirm/" + confirmationCode);
  return res.data;
};

/**
 * @desc change user password
 * @route PUT /api/users/changePassword/:userId
 * @access private
 */
const changePassword = async (userData) => {
  const res = await axios.put(
    API_URI + "changePassword/" + userData._id,
    userData
  );
  return res.data;
};

const sendChangePasswordEmail = async (user) => {
  try {
    const res = await axios.post(API_URI + "changePassword/" + user._id, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmail = async (email) => {
  const res = await axios.post(API_URI + "getUser", email);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

const authService = {
  login,
  logout,
  register,
  verifyUser,
  changePassword,
  sendChangePasswordEmail,
  getUserByEmail,
};
export default authService;

const express = require("express");
const { protectRoute } = require("../middlewares/authMiddleware");
const {
  getAllTask,
  createTask,
  deleteTask,
  updateTask,
  getTask,
} = require("../controllers/taskControllers");
const router = express.Router();

router.route("/").get(protectRoute, getAllTask).post(protectRoute, createTask);
router
  .route("/:id")
  .delete(protectRoute, deleteTask)
  .put(protectRoute, updateTask)
  .get(protectRoute, getTask);

module.exports = router;

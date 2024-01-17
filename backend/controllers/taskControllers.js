const asyncHandler = require("express-async-handler");
// const { findById } = require("../models/taskModel");
const Task = require("../models/taskModel");

/**
 * @desc Find and return all the task related to the user if there's any
 * @route GET /api/tasks/
 * @access Private
 */

const getAllTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  if (!tasks) {
    res.status(401).json({ message: "No task found." });
  } else {
    res.status(200).json(tasks);
  }
});
/**
 * @desc Find and return the specific task with the id passed in
 * @route GET /api/tasks/:id
 * @access Private
 */
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400).json({ message: "Task Not Found; Invalid ID" });
    return;
  }
  if (!req.user) {
    res.status(400).json({ message: "You are not logged in." });
    return;
  }
  if (task.user.toString() !== req.user.id) {
    res.status(400).json({ message: "User not authorized; invalid task ID" });
    return;
  }
  if (task) {
    res.status(200).json(task);
  }
});
/**
 * @desc Create a new task and send to the database
 * @route POST /api/tasks/
 * @access Private
 */

const createTask = asyncHandler(async (req, res) => {
  const { task, description, dueDateTime, isImportant } = req.body;
  let modifiedDueDateTime;
  if (!task) {
    res.status(400);
    return;
  }
  if (dueDateTime) {
    modifiedDueDateTime = new Date(dueDateTime);
  }

  const newTask = await Task.create({
    user: req.user._id,
    task: task,
    description: description,
    dueDateTime: modifiedDueDateTime,
    isImportant: isImportant,
  });

  if (newTask) {
    // Send the new task to the user
    res.json(newTask).status(200);
  } else {
    res.status(400).json({ message: "Something went wrong!" });
  }
});

/**
 * @desc Update a task
 * @route PUT /api/tasks/:id
 * @access Private
 */
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  // Have to check that 1. task exist, 2. user exist, 3. task.user === user.id
  if (!task) {
    res.status(400).json({ message: "Task Not Found; Invalid ID" });
    return;
  }
  if (!req.user) {
    res.status(400).json({ message: "You are not logged in." });
    return;
  }
  if (task.user.toString() !== req.user.id) {
    res.status(400).json({ message: "User not authorized; invalid task ID" });
    return;
  }

  const newData = {
    user: req.user._id,
    task: req.body.task,
    description: req.body.description,
    dueDateTime:
      req.body.dueDateTime == null || req.body.dueDateTime == ""
        ? null
        : req.body.dueDateTime,
    isImportant: req.body.isImportant,
  };

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, newData, {
    new: true,
  });

  if (updatedTask) {
    res.status(200).json(newData.task);
  }
});

/**
 * @desc Delete a task
 * @route DELETE /api/tasks/:id
 * @access Private
 */

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400).json({ message: "Failed to delete task; Task not found" });
    return;
  }
  if (!req.user) {
    res
      .status(400)
      .json({ message: "Failed to delete task; Please log in first" });
    return;
  }

  if (req.user.id !== task.user.toString()) {
    res
      .status(400)
      .json({ message: "Failed to delete task; User not authorized" });
    return;
  }
  // remove the task
  task.remove();
  res.status(200).json({ _id: req.params.id });
});

module.exports = { deleteTask, updateTask, createTask, getAllTask, getTask };

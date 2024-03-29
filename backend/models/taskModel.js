const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel", // referring the User collection
    },
    task: {
      type: String,
      required: [true, "Please enter a task name"],
    },
    description: {
      type: String,
      required: false,
    },
    dueDateTime: {
      type: Date || String,
      required: false,
    },
    isImportant: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Task", taskSchema);

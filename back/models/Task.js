const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date }, // Task due date and time
  reminder: { type: Boolean, default: false }, // Reminder flag
});

module.exports = mongoose.model("Task", TaskSchema);

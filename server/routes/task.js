const express = require("express");
const router = express.Router();
const Task = require("../model/task");

// POST a new task
router.post("/add-task", async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new Task({ task });
    await newTask.save();
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (err) {
    console.error("Add task error:", err.message);
    res.status(500).json({ error: "Failed to add task", message: err.message });
  }
});

//  GET tasks
router.get("/task", async (req, res) => {
  try {
    const{status}=req.query
    const tasks = await Task.find({ status: status });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Get completed tasks error:", err.message);
    res.status(500).json({ error: "Failed to fetch completed tasks", message: err.message });
  }
});



//  DELETE a task
router.delete("/delete/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (err) {
    console.error("Delete task error:", err.message);
    res.status(500).json({ error: "Failed to delete task", message: err.message });
  }
});

//  PUT - update task status
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task status updated", task });
  } catch (err) {
    console.error("Update task status error:", err.message);
    res.status(500).json({ error: "Failed to update task status", message: err.message });
  }
});

//  PUT - edit task (both task & status)
router.put("/edit-task/:id", async (req, res) => {
  try {
    const { task, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { task, status },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    console.error("Edit task error:", err.message);
    res.status(500).json({ error: "Failed to update task", message: err.message });
  }
});

module.exports = router;

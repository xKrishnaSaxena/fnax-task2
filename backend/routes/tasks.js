import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).send(newTask);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(updatedTask);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

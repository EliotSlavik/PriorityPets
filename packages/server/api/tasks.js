import express from "express";

import { Task } from "../models";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const tasks = await Task.find().exec();
    response.json(tasks);
  } catch (error) {
    response.status(500).json({ error: "An error occurred when retrieving tasks." });
  }
});

router.post("/", async (request, response) => {
  const { name, description, dueDate, priority, completed, category, user } = request.body;

  const newTask = new Task({
    name,
    description,
    dueDate,
    priority,
    completed,
    category,
    user,
  });

  try {
    await newTask.save();
    response.json(newTask);
  } catch (error) {
    response.status(500).json({ error: "An error occurred when creating the task." });
  }
});

module.exports = router;

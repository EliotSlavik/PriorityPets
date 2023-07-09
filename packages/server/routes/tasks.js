import express from "express";
const { Task, User } = require("../models");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const result = await User.findOne({ email: request.query.userEmail }).populate("tasks").exec();
    response.json(result.tasks);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
});

router.post("/", async (request, response) => {
  const { name, description, priority, category, dueDate, completed, reminder, userEmail } = request.body;

  if (!name || !dueDate || !userEmail) {
    return response.status(400).json({ error: "Required fields are missing." });
  }

  const user = await User.findOne({ email: userEmail });

  const newTask = new Task({
    name,
    description,
    priority,
    category,
    dueDate,
    completed,
    reminder,
    // user: user._id,
    user: user._id,
  });

  try {
    // await newTask.save();
    const taskData = await newTask.save();
    await User.findOneAndUpdate({ email: userEmail }, { $push: { tasks: taskData._id } });
    response.json(newTask);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "An error occurred when creating your task." });
  }
});

router.put("/complete", async (request, response) => {
  const { userId, taskId } = request.body;
  try {
    const task = await Task.findById(taskId);
    const user = await User.findById(userId);

    if (!task) {
      return response.status(404).json({ error: "Task not found." });
    }

    if (!user) {
      return response.status(404).json({ error: "User not found." });
    }

    task.completed = !task.completed;
    const lastUpdate = task.updatedAt;
    task.updatedAt = new Date();
    await task.save();

    const creationDate = task.createdAt;
    const currentTime = new Date();

    const isWithin24Hours = Math.abs(lastUpdate - currentTime) <= 24 * 60 * 60 * 1000;

    if (isWithin24Hours) {
      user.points += 1;
      user.xp += 1;
      await user.save();
    } else {
      const isWithin24HoursFromCreation = Math.abs(currentTime - creationDate) <= 24 * 60 * 60 * 1000;

      if (!isWithin24HoursFromCreation) {
        user.points += 1;
        user.xp += 1;
        await user.save();
      }
    }

    response.json(task);
  } catch (error) {
    response.status(500).json({ error: "An error occurred when completing the task." });
  }
});

module.exports = router;

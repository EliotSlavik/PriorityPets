import express from "express";
const { Task, User } = require("../models");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    console.log("GET /api/tasks");
    console.log(request.query)
    const result = await User.findOne({email: request.query.userEmail}).populate("tasks").exec();
    console.log(result)
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
    await User.findOneAndUpdate({ email: userEmail }, { $push: { tasks: taskData._id } })
    response.json(newTask);
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: "An error occurred when creating your task." });
  }
});


module.exports = router;

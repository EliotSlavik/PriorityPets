import express from "express";
import userRouter from "./users";
import taskRouter from "./tasks";
import petRouter from "./pets";
import authRouter from "./auth";

import { User } from "../models";
import listEndpoints from "express-list-endpoints";

const router = express.Router();

// Define routes
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/pets", petRouter);
router.use("/auth", authRouter);

export default router;

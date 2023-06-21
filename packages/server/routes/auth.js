import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";

const router = express.Router();

router.use(express.json());

// Enable CORS to allow cross-origin requests
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

router.get("/", (req, res, next) => {
  res.send("auth endpoint");
});

router.get("/signup", (req, res, next) => {
  res.send("signup endpoint");
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!password || !username || !email) {
    return res.status(422).json({ error: "please add all the fields" });
  }

  const symbolCheck = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const uppercaseCheck = /[A-Z]/;
  const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // Updated email validation pattern

  if (!symbolCheck.test(password)) {
    return res.status(400).json({ error: "password must contain at least one symbol (e.g., ?!@#$%^&*)" });
  }

  if (!uppercaseCheck.test(password)) {
    return res.status(400).json({ error: "password must contain at least one uppercase letter" });
  }

  if (password.length < 8 || password.length > 20) {
    return res.status(400).json({ error: "password length must be between 8 and 20 characters" });
  }

  if (!emailCheck.test(email)) {
    return res.status(400).json({ error: "invalid email address" });
  }

  try {
    const savedUser = await User.findOne({ username: username });

    if (savedUser) {
      return res.status(422).json({ error: "user already exists with that name" });
    }

    const hashedpassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hashedpassword,
    });

    const newUser = await user.save();

    const userForToken = {
      username: newUser.username,
      id: newUser._id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    // Return the JWT token in the response headers
    res.setHeader("Authorization", token);

    res.status(201).json({ message: "saved successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error occurred while signing up" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "missing email or password" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email",
      });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    // Return the JWT token in the response headers
    res.setHeader("Authorization", token);

    res.status(200).json({ token, username: user.username, uid: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error occurred while signing in" });
  }
});

export default router;

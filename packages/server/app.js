import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authMiddleware from "./authMiddleware"; // *****ES

// Database
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB connected!"))
  .catch((err) => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// *****ES
const express = require('express');
const passport = require('./passport'); // Path to the passport.js file

// Create an instance of Express.js and configure other middleware

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

const express = require('express');
const authMiddleware = require('./authMiddleware');

// Create an instance of Express.js and configure other middleware

// Use the authMiddleware on the protected routes
app.get('/protected', authMiddleware, (req, res) => {
  // Access the user information from req.user
  console.log(req.user);

  // Handle the protected route logic
  res.send('Protected route');
});

// *****ES 4
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authMiddleware = require('./authMiddleware');
require('./passport'); // Import and configure the Passport.js file


// Configure session middleware
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Example protected route: 
app.get('/routes/user', authMiddleware, (req, res) => {
  // Access the authenticated user's information through req.user
  res.send(`Welcome, ${req.user.username}!`);
});

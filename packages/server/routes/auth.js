import keys from "../config/keys";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

router.get("/signup", async (req, res, next) => {
  res.json({
    message: "signup",
  });
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(422).json({
        message: "Validation error",
        errors: {
          email: "Email address already in use.",
        },
      });

    const passwordHash = await bcrypt.hash(password, keys.auth.hashRounds);
    user = await User.create({ email, passwordHash, username });

    user = user.toJSON();
    delete user.passwordHash;

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        message: "Authentication error",
        errors: {
          email: "Invalid credentials.",
        },
      });

    const passwordIsValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordIsValid)
      return res.status(401).json({
        message: "Authentication error",
        errors: {
          email: "Invalid credentials.",
        },
      });

    const accessToken = jwt.sign({ sub: email }, keys.auth.accessTokenSecret, {
      expiresIn: keys.auth.accessTokenExp,
    });
    //const refreshToken = jwt.sign({ sub: user._id }, keys.auth.refreshTokenSecret, { expiresIn: keys.auth.refreshTokenExp });

    //user.refreshTokens = [...user.refreshTokens, refreshToken];

    await user.save();

    user = user.toJSON();
    delete user.passwordHash;

    res.json({ token: accessToken, email }); //res.cookie(keys.auth.cookieName, refreshToken, keys.auth.cookieOptions).json({ token: accessToken, user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

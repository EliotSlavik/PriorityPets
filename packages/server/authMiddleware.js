// *****ES

const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = (req, res, next) => {
    // Get the JWT from the Authorization header
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    try {
      // Verify the JWT using the JWT_SECRET
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
      // Extract the user information from the decoded token
      req.user = decodedToken;
  
      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
  
  module.exports = authMiddleware;

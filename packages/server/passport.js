// *****ES
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user'); 

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Find the user by email in your MongoDB collection
        const user = await User.findOne({ email });
  
        // If no user is found, handle the error
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
  
        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
  
        // If the password doesn't match, handle the error
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
  
        // If the email and password are correct, return the user object
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      // Find the user by ID in your MongoDB collection
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  module.exports = passport;

  
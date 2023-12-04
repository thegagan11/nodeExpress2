// auth.js
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createTokenForUser = require('../helpers/createToken');
const ExpressError = require('../helpers/expressError');

// Input validation functions (these can be more elaborate)
const isValidInput = (input) => input && input.trim() !== '';

router.post('/register', async function(req, res, next) {
  try {
    const { username, password, first_name, last_name, email, phone } = req.body;

    // Simple input validation
    if (!isValidInput(username) || !isValidInput(password)) {
      throw new ExpressError("Username and password required", 400);
    }

    let user = await User.register({ username, password, first_name, last_name, email, phone });
    const token = createTokenForUser(user.username);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!isValidInput(username) || !isValidInput(password)) {
      throw new ExpressError("Username and password required", 400);
    }

    let user = await User.authenticate(username, password);
    const token = createTokenForUser(user.username);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

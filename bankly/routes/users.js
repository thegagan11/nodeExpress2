// users.js
const User = require('../models/user');
const express = require('express');
const router = new express.Router();
const { authUser, requireLogin, requireAdmin } = require('../middleware/auth');
const ExpressError = require('../helpers/expressError');

router.get('/', authUser, requireLogin, async function(req, res, next) {
  try {
    let users = await User.getAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

router.get('/:username', authUser, requireLogin, async function(req, res, next) {
  try {
    let user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:username', authUser, requireLogin, requireAdmin, async function(req, res, next) {
  try {
    if (req.params.username !== req.curr_username && !req.curr_admin) {
      throw new ExpressError("Unauthorized", 401);
    }

    let user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:username', authUser, requireAdmin, async function(req, res, next) {
  try {
    await User.delete(req.params.username);
    return res.json({ message: "User deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

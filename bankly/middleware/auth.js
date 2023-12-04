const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const ExpressError = require('../helpers/expressError');

function requireLogin(req, res, next) {
  if (!req.curr_username) {
    return next(new ExpressError('Unauthorized', 401));
  }
  return next();
}

function requireAdmin(req, res, next) {
  if (!req.curr_admin) {
    return next(new ExpressError('Unauthorized - Admin Only', 401));
  }
  return next();
}

function authUser(req, res, next) {
  try {
    const token = req.body._token || req.query._token;
    if (token) {
      let payload = jwt.verify(token, SECRET_KEY);
      req.curr_username = payload.username;
      req.curr_admin = payload.admin;
    }
    return next();
  } catch (err) {
    return next(new ExpressError('Invalid token', 401));
  }
}

module.exports = {
  requireLogin,
  requireAdmin,
  authUser
};

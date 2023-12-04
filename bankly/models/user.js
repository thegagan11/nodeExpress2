const bcrypt = require('bcrypt');
const db = require('../db');
const ExpressError = require('../helpers/expressError');
const sqlForPartialUpdate = require('../helpers/partialUpdate');
const { BCRYPT_WORK_FACTOR } = require("../config");

// Utility functions for validation
const validateUsername = (username) => /^[a-zA-Z0-9]{4,20}$/.test(username);
const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/.test(password);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{10}$/.test(phone);

class User {

  /** Register user with data. Returns new user data. */
  static async register({ username, password, first_name, last_name, email, phone }) {
    // Validate inputs
    if (!validateUsername(username)) throw new ExpressError("Invalid username.", 400);
    if (!validatePassword(password)) throw new ExpressError("Invalid password.", 400);
    if (!validateEmail(email)) throw new ExpressError("Invalid email.", 400);
    if (!validatePhone(phone)) throw new ExpressError("Invalid phone number.", 400);

    // Check for duplicate username
    const duplicateCheck = await db.query(`SELECT username FROM users WHERE username = $1`, [username]);
    if (duplicateCheck.rows[0]) throw new ExpressError(`User '${username}' already exists`, 400);

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email, phone) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING username, first_name, last_name, email, phone`,
      [username, hashedPassword, first_name, last_name, email, phone]
    );
    return result.rows[0];
  }

  /** Authenticate user. Returns user data if valid. */
  static async authenticate(username, password) {
    const result = await db.query(`SELECT username, password, first_name, last_name, email, phone FROM users WHERE username = $1`, [username]);
    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) return { username: user.username, first_name: user.first_name, last_name: user.last_name, email: user.email, phone: user.phone };
      throw new ExpressError("Invalid password", 401);
    }
    throw new ExpressError("User not found", 404);
  }

  /** Returns list of user info. */
  static async getAll() {
    const result = await db.query(`SELECT username, first_name, last_name, email, phone FROM users ORDER BY username`);
    return result.rows;
  }

  /** Returns single user info. */
  static async get(username) {
    const result = await db.query(`SELECT username, first_name, last_name, email, phone FROM users WHERE username = $1`, [username]);
    const user = result.rows[0];

    if (!user) throw new ExpressError("User not found", 404);
    return user;
  }

  /** Updates user data. */
  static async update(username, data) {
    const { query, values } = sqlForPartialUpdate('users', data, 'username', username);
    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) throw new ExpressError("User not found", 404);
    return user;
  }

  /** Deletes a user. */
  static async delete(username) {
    const result = await db.query(`DELETE FROM users WHERE username = $1 RETURNING username`, [username]);
    if (!result.rows[0]) throw new ExpressError("User not found", 404);
    return true;
  }
}

module.exports = User;

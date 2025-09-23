const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");
let books = require("../booksdb.js");
let users = require("../users.js");

const regd_users = express.Router();

// Helper: check if username exists
function isValid(username) {
  return users.some(u => u.username === username);
}

// Helper: authenticate user
function authenticatedUser(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  return user || null;
}

// Register
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Missing fields" });

  if (isValid(username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = authenticatedUser(username, password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  req.session.authorization = { accessToken, username };

  return res.json({ message: "Login successful", username, accessToken });
});

// Add/modify review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.user.username;

  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

  books[isbn].reviews[username] = review;
  return res.json({ message: "Review added/updated", reviews: books[isbn].reviews });
});

// Delete review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

  delete books[isbn].reviews[username];
  return res.json({ message: "Review deleted", reviews: books[isbn].reviews });
});

module.exports.authenticated = regd_us

const express = require("express");
const jwt = require("jsonwebtoken");
const books = require("../booksdb");
const users = require("../users");
const { SECRET } = require("../middleware/auth");

const regd_users = express.Router();

// Validate if username exists
function isValid(username) {
  return users.some(u => u.username === username);
}

// Authenticate user by username & password
function authenticatedUser(username, password) {
  return users.find(u => u.username === username && u.password === password);
}

// User login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const user = authenticatedUser(username, password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ username: user.username }, SECRET, { expiresIn: "1h" });
  req.session.authorization = { accessToken, username: user.username };
  return res.json({ message: "Login successful", username: user.username, accessToken });
});

// Add or modify a review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review, stars } = req.body;
  const username = req.session.authorization?.username;

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[isbn].reviews[username] = { review, stars: stars || 0 };
  return res.json({ message: "Review added/updated", reviews: books[isbn].reviews });
});

// Delete a review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.session.authorization?.username;

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.json({ message: "Review deleted", reviews: books[isbn].reviews });
  }

  return res.status(404).json({ message: "Review not found for this user" });
});

module.exports.authenticated = regd_users;

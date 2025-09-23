const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");
let books = require("../booksdb.js");
let users = require("../users.js");

const regd_users = express.Router();

// ---------- Helpers ----------
function isValid(username) {
  return users.some(u => u.username === username);
}

function authenticatedUser(username, password) {
  return users.find(u => u.username === username && u.password === password);
}

// ---------- Routes ----------

// Register
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

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
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const accessToken = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  req.session.authorization = { accessToken, username };

  return res.json({ message: "Login successful", username, accessToken });
});

// Add or modify review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { review, stars } = req.body;
  const username = req.user?.username;

  if (!username) return res.status(401).json({ message: "Unauthorized" });
  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });
  if (!review || typeof review !== "string") {
    return res.status(400).json({ message: "Review text is required" });
  }
  if (!stars || stars < 1 || stars > 5) {
    return res.status(400).json({ message: "Stars must be between 1 and 5" });
  }

  // Initialize reviews object if missing
  if (!books[isbn].reviews) books[isbn].reviews = {};

  books[isbn].reviews[username] = { text: review, stars };
  return res.json({
    message: "Review added/updated",
    reviews: books[isbn].reviews
  });
});

// Delete review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user?.username;

  if (!username) return res.status(401).json({ message: "Unauthorized" });
  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

  if (books[isbn].reviews && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.json({
      message: "Review deleted",
      reviews: books[isbn].reviews
    });
  }

  return res.status(404).json({ message: "No review found for this user" });
});

// ---------- Export ----------
module.exports.authenticated = regd_users;

const express = require("express");
const jwt = require("jsonwebtoken");
const books = require("./booksdb");
const { authenticateUser } = require("./users");

const SECRET = "jwt_secret_123";
const regd_users = express.Router();

// Task 7: Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  const user = authenticateUser(username, password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = jwt.sign({ username }, SECRET, { expiresIn: "1h" });

  // Save in session too, for convenience
  if (req.session) {
    req.session.authorization = { accessToken, username };
  }

  return res.json({ username, accessToken });
});

// Task 8 and 9: Add, modify, or delete review for a book
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body || {};
  const username = req.user?.username || req.session?.authorization?.username;

  if (!username) return res.status(401).json({ message: "Unauthorized" });
  if (!review) return res.status(400).json({ message: "Review text required" });

  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  if (!book.reviews) book.reviews = {};

  // Add or update only own review
  book.reviews[username] = review;

  return res.json({ message: "Review saved" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.user?.username || req.session?.authorization?.username;

  if (!username) return res.status(401).json({ message: "Unauthorized" });

  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  if (!book.reviews) book.reviews = {};

  if (!(username in book.reviews)) {
    return res.status(404).json({ message: "No existing review to delete" });
  }
  delete book.reviews[username];

  return res.json({ message: "Review deleted" });
});

module.exports.authenticated = regd_users;

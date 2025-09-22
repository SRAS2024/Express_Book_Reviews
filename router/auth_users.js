const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { books } = require("../booksdb");
const { authenticate } = require("../users");
const { SECRET } = require("../middleware/auth");

// Task 7: Login
router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  if (!authenticate(username, password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const accessToken = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  if (req.session) {
    req.session.authorization = { accessToken, username };
  }
  res.json({ message: "Login successful", accessToken, username });
});

// All routes below require verifyJwt middleware at index.js: /customer/auth/*

// Task 8: Add or modify a review for a book
router.put("/auth/review/:isbn", (req, res) => {
  const { username } = req.user;
  const { review } = req.body || {};
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  if (typeof review !== "string" || review.trim().length === 0) {
    return res.status(400).json({ message: "Review text required" });
  }
  if (!book.reviews) book.reviews = {};
  book.reviews[username] = review.trim();
  res.json({ message: "Review added or updated", isbn, reviews: book.reviews });
});

// Task 9: Delete the logged in user's review
router.delete("/auth/review/:isbn", (req, res) => {
  const { username } = req.user;
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  if (book.reviews && book.reviews[username]) {
    delete book.reviews[username];
    return res.json({ message: "Review deleted", isbn, reviews: book.reviews });
  }
  return res.status(404).json({ message: "No review by this user for the given book" });
});

module.exports.authenticated = router;

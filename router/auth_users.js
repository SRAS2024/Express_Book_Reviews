const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");

let books = require("../booksdb.js");
let users = require("../users.js");

const regd_users = express.Router();

function findUser(username) {
  return users.find(u => u.username === username);
}

// Register
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "Missing fields" });
  if (findUser(username)) return res.status(400).json({ message: "User already exists" });
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const ok = users.find(u => u.username === username && u.password === password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const accessToken = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  req.session.authorization = { accessToken, username };
  return res.json({ message: "Login successful", username, accessToken });
});

// Forgot Password: validate username
regd_users.post("/forgot", (req, res) => {
  const { username } = req.body || {};
  if (!username) return res.status(400).json({ message: "Missing username" });
  const user = findUser(username);
  if (!user) return res.status(404).json({ message: "Invalid Username" });
  return res.json({ message: "Valid Username", username });
});

// Reset Password
regd_users.post("/reset", (req, res) => {
  const { username, newPassword } = req.body || {};
  if (!username || !newPassword) return res.status(400).json({ message: "Missing fields" });
  const user = findUser(username);
  if (!user) return res.status(404).json({ message: "Invalid Username" });

  // update password
  user.password = newPassword;

  // auto-login after reset
  const accessToken = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  req.session.authorization = { accessToken, username };
  return res.json({ message: "Password reset successful", username, accessToken });
});

// Who am I
regd_users.get("/auth/me", (req, res) => {
  const username = req.user?.username;
  if (!username) return res.status(401).json({ message: "Not logged in" });
  return res.json({ username });
});

// Add or update review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body || {};
  const username = req.user?.username;

  if (!username) return res.status(401).json({ message: "Unauthorized" });
  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });
  if (!review || typeof review.text !== "string" || typeof review.rating !== "number") {
    return res.status(400).json({ message: "Missing review text or rating" });
  }

  books[isbn].reviews = books[isbn].reviews || {};
  books[isbn].reviews[username] = {
    text: review.text,
    rating: Math.max(1, Math.min(5, review.rating)),
    createdAt: Date.now()
  };

  return res.json({
    message: "Review added/updated",
    reviews: books[isbn].reviews
  });
});

// Delete review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.user?.username;

  if (!username) return res.status(401).json({ message: "Unauthorized" });
  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

  books[isbn].reviews = books[isbn].reviews || {};
  delete books[isbn].reviews[username];

  return res.json({
    message: "Review deleted",
    reviews: books[isbn].reviews
  });
});

// Fetch reviews with edit flags
regd_users.get("/auth/reviews/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.user?.username;
  const book = books[isbn];

  if (!book) return res.status(404).json({ message: "Book not found" });

  const reviewsWithFlags = {};
  for (const [user, review] of Object.entries(book.reviews || {})) {
    reviewsWithFlags[user] = {
      ...review,
      canEdit: user === username
    };
  }

  return res.json({ reviews: reviewsWithFlags });
});

module.exports.authenticated = regd_users;

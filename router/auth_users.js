const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");

let books = require("../booksdb.js");
let users = require("../users.js");

const regd_users = express.Router();

function findUser(username) {
  return users.find(u => u.username === username);
}

regd_users.post("/register", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }
  if (findUser(username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const ok = users.find(u => u.username === username && u.password === password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const accessToken = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  req.session.authorization = { accessToken, username };
  return res.json({ message: "Login successful", username, accessToken });
});

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
    rating: Math.max(1, Math.min(5, review.rating)),
    text: review.text
  };

  return res.json({ message: "Review added/updated", reviews: books[isbn].reviews });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.user?.username;

  if (!username) return res.status(401).json({ message: "Unauthorized" });
  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

  books[isbn].reviews = books[isbn].reviews || {};
  delete books[isbn].reviews[username];

  return res.json({ message: "Review deleted", reviews: books[isbn].reviews });
});

module.exports.authenticated = regd_users;

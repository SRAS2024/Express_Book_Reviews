const express = require("express");
const books = require("../booksdb");
const users = require("../users");

const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.json({ message: "User registered successfully" });
});

// Get all books
public_users.get("/books", (req, res) => {
  return res.json({ books: Object.values(books) });
});

// Get book by ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.json(book);
});

// Get books by author
public_users.get("/author/:author", (req, res) => {
  const { author } = req.params;
  const found = Object.values(books).filter(b => b.author.toLowerCase() === author.toLowerCase());
  return res.json({ books: found });
});

// Get books by title
public_users.get("/title/:title", (req, res) => {
  const { title } = req.params;
  const found = Object.values(books).filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
  return res.json({ books: found });
});

// Get reviews for a book
public_users.get("/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.json({ reviews: book.reviews });
});

module.exports.general = public_users;

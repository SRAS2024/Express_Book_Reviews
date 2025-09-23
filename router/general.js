const express = require("express");
const books = require("./booksdb");
const { isValid, addUser } = require("./users");

const public_users = express.Router();

// Task 1: Get book list
public_users.get("/books", (req, res) => {
  // Return normalized array for front end
  const list = Object.entries(books).map(([isbn, b]) => ({
    isbn, title: b.title, author: b.author
  }));
  res.json({ books: list });
});

// Task 2: Get book by ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json({ isbn, title: book.title, author: book.author });
});

// Task 3: Get all books by author
public_users.get("/author/:author", (req, res) => {
  const q = decodeURIComponent(req.params.author).toLowerCase();
  const list = Object.entries(books)
    .filter(([, b]) => b.author.toLowerCase().includes(q))
    .map(([isbn, b]) => ({ isbn, title: b.title, author: b.author }));
  res.json({ books: list });
});

// Task 4: Get all books by title
public_users.get("/title/:title", (req, res) => {
  const q = decodeURIComponent(req.params.title).toLowerCase();
  const list = Object.entries(books)
    .filter(([, b]) => b.title.toLowerCase().includes(q))
    .map(([isbn, b]) => ({ isbn, title: b.title, author: b.author }));
  res.json({ books: list });
});

// Task 5: Get book reviews
public_users.get("/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json({ reviews: book.reviews || {} });
});

// Task 6: Register new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }
  addUser(username, password);
  return res.json({ message: "User registered successfully" });
});

module.exports.general = public_users;

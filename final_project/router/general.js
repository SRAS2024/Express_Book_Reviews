const express = require("express");
const router = express.Router();
const { books } = require("../booksdb");
const { register } = require("../users");

// Task 1: Get the book list
router.get("/books", (req, res) => {
  res.json({ books: Object.values(books) });
});

// Task 2: Get book by ISBN
router.get("/isbn/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// Task 3: Get all books by author
router.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const result = Object.values(books).filter(b => b.author.toLowerCase() === author);
  res.json({ books: result });
});

// Task 4: Get all books by title
router.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const result = Object.values(books).filter(b => b.title.toLowerCase() === title);
  res.json({ books: result });
});

// Task 5: Get book reviews by ISBN
router.get("/review/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json({ isbn: book.isbn, reviews: book.reviews || {} });
});

// Task 6: Register new user
router.post("/register", (req, res) => {
  const { username, password } = req.body || {};
  const result = register(username, password);
  if (!result.ok) return res.status(400).json({ message: result.msg });
  res.json({ message: "User registered successfully" });
});

module.exports.general = router;

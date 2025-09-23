const express = require("express");
let books = require("../booksdb.js");

const public_users = express.Router();

// Get all books
public_users.get("/books", (req, res) => {
  return res.json({ books });
});

// Get book by ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.json(book);
});

// Get books by author
public_users.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const filtered = Object.values(books).filter(b => b.author.toLowerCase() === author);
  return res.json({ books: filtered });
});

// Get books by title
public_users.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const filtered = Object.values(books).filter(b => b.title.toLowerCase().includes(title));
  return res.json({ books: filtered });
});

// Get reviews by ISBN
public_users.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.json({ reviews: book.reviews });
});

module.exports.general = public_users;

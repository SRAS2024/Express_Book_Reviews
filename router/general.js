const express = require("express");
let books = require("../booksdb.js");

const public_routes = express.Router();

// Get all books
public_routes.get("/books", (req, res) => {
  return res.json({ books });
});

// Get book by ISBN
public_routes.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.json(book);
});

// Get books by author
public_routes.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const results = Object.values(books).filter(
    b => b.author.toLowerCase().includes(author)
  );

  if (results.length === 0) {
    return res.status(404).json({ message: "No books found for this author" });
  }
  return res.json({ books: results });
});

// Get books by title
public_routes.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const results = Object.values(books).filter(
    b => b.title.toLowerCase().includes(title)
  );

  if (results.length === 0) {
    return res.status(404).json({ message: "No books found with this title" });
  }
  return res.json({ books: results });
});

// Get reviews by ISBN
public_routes.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.json({ reviews: book.reviews || {} });
});

module.exports.general = public_routes;

const express = require("express");
let books = require("../booksdb.js");

const public_routes = express.Router();

// Get full book list
public_routes.get("/books", (req, res) => {
  const bookArray = Object.entries(books).map(([isbn, book]) => ({
    isbn,
    title: book.title,
    author: book.author
  }));
  return res.json({ books: bookArray });
});

// Get book by ISBN
public_routes.get("/isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.json({ isbn, ...books[isbn] });
});

// Get books by author
public_routes.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const results = Object.entries(books)
    .filter(([isbn, book]) => book.author.toLowerCase().includes(author))
    .map(([isbn, book]) => ({ isbn, title: book.title, author: book.author }));

  if (results.length === 0) {
    return res.status(404).json({ message: "No books found for this author" });
  }
  return res.json({ books: results });
});

// Get books by title
public_routes.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const results = Object.entries(books)
    .filter(([isbn, book]) => book.title.toLowerCase().includes(title))
    .map(([isbn, book]) => ({ isbn, title: book.title, author: book.author }));

  if (results.length === 0) {
    return res.status(404).json({ message: "No books found for this title" });
  }
  return res.json({ books: results });
});

// Get reviews for a book
public_routes.get("/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.json({ reviews: books[isbn].reviews || {} });
});

module.exports.general = public_routes;

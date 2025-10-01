const express = require("express");
const router = express.Router();

// booksdb is an object keyed by ISBN
const books = require("../booksdb.js");

/**
 * Task 1: Get full list of books
 * Response: { books: [ {isbn,title,author,genre,...}, ... ] }
 */
router.get("/books", (_req, res) => {
  const list = Object.entries(books).map(([isbn, b]) => ({
    isbn,
    title: b.title,
    author: b.author,
    genre: b.genre || "",
    description: b.description || "",
    reviews: b.reviews || {}
  }));
  return res.json({ books: list });
});

/**
 * Task 2: Get book by ISBN
 * Response: book object
 */
router.get("/isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  const b = books[isbn];
  if (!b) return res.status(404).json({ message: "Book not found" });
  return res.json({ isbn, ...b });
});

/**
 * Task 3: Get all books by author (case-insensitive)
 * Response: { books: [...] }
 */
router.get("/author/:author", (req, res) => {
  const q = req.params.author.toLowerCase();
  const result = Object.entries(books)
    .filter(([, b]) => (b.author || "").toLowerCase().includes(q))
    .map(([isbn, b]) => ({ isbn, ...b }));
  return res.json({ books: result });
});

/**
 * Task 4: Get all books by title (case-insensitive)
 * Response: { books: [...] }
 */
router.get("/title/:title", (req, res) => {
  const q = req.params.title.toLowerCase();
  const result = Object.entries(books)
    .filter(([, b]) => (b.title || "").toLowerCase().includes(q))
    .map(([isbn, b]) => ({ isbn, ...b }));
  return res.json({ books: result });
});

/**
 * Task 5: Get reviews of a book
 * Response: { reviews: { username: text, ... } }
 */
router.get("/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const b = books[isbn];
  if (!b) return res.status(404).json({ message: "Book not found" });
  return res.json({ reviews: b.reviews || {} });
});

/**
 * Task 6: Get all books by genre
 * Response: { books: [...] }
 */
router.get("/genre/:genre", (req, res) => {
  const q = req.params.genre.toLowerCase();
  const result = Object.entries(books)
    .filter(([, b]) => (b.genre || "").toLowerCase().includes(q))
    .map(([isbn, b]) => ({ isbn, ...b }));
  return res.json({ books: result });
});

/**
 * Task 7: Search suggestions (title, author, isbn, genre)
 * Returns up to 3 suggestions
 */
router.get("/suggest/:q", (req, res) => {
  const q = (req.params.q || "").toLowerCase();
  if (!q) return res.json({ suggestions: [] });

  const suggestions = [];
  for (const [isbn, b] of Object.entries(books)) {
    if (isbn.includes(q) ||
        (b.title && b.title.toLowerCase().includes(q)) ||
        (b.author && b.author.toLowerCase().includes(q)) ||
        (b.genre && b.genre.toLowerCase().includes(q))) {
      suggestions.push({
        isbn,
        title: b.title,
        author: b.author,
        genre: b.genre || ""
      });
    }
    if (suggestions.length >= 3) break;
  }

  return res.json({ suggestions });
});

module.exports.general = router;

const axios = require("axios");
const API = "http://localhost:5000";

// Task 10: Get all books using async callback style
function getAllBooksAsync(callback) {
  axios.get(`${API}/books`)
    .then(res => callback(null, res.data))
    .catch(err => callback(err));
}

// Task 11: Search by ISBN using Promises
function searchByISBN(isbn) {
  return axios.get(`${API}/isbn/${encodeURIComponent(isbn)}`).then(res => res.data);
}

// Task 12: Search by Author using Promises
function searchByAuthor(author) {
  return axios.get(`${API}/author/${encodeURIComponent(author)}`).then(res => res.data.books);
}

// Task 13: Search by Title using async await
async function searchByTitle(title) {
  const res = await axios.get(`${API}/title/${encodeURIComponent(title)}`);
  return res.data.books;
}

// Demo runner
if (require.main === module) {
  console.log("Running demo tasks");
  getAllBooksAsync((err, data) => {
    if (err) return console.error("Task 10 error:", err.message);
    console.log("Task 10 OK. Count:", data.books.length);

    searchByISBN("9780143127741")
      .then(book => {
        console.log("Task 11 OK. Title:", book.title);
        return searchByAuthor("Andy Weir");
      })
      .then(books => {
        console.log("Task 12 OK. Count:", books.length);
        return searchByTitle("The Martian");
      })
      .then(books => {
        console.log("Task 13 OK. Count:", books.length);
      })
      .catch(e => console.error("Demo error:", e.message));
  });
}

module.exports = { getAllBooksAsync, searchByISBN, searchByAuthor, searchByTitle };

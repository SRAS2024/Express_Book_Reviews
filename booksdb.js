// Simple in-memory catalog keyed by ISBN
const books = {
  "9780143127741": {
    isbn: "9780143127741",
    title: "The Martian",
    author: "Andy Weir",
    reviews: {} // username: review string
  },
  "9780061120084": {
    isbn: "9780061120084",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    reviews: {}
  },
  "9780307277671": {
    isbn: "9780307277671",
    title: "The Road",
    author: "Cormac McCarthy",
    reviews: {}
  },
  "9780553386790": {
    isbn: "9780553386790",
    title: "A Game of Thrones",
    author: "George R. R. Martin",
    reviews: {}
  },
  "9780385547345": {
    isbn: "9780385547345",
    title: "The Midnight Library",
    author: "Matt Haig",
    reviews: {}
  },
  "9780590353427": {
    isbn: "9780590353427",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J. K. Rowling",
    reviews: {}
  }
};

module.exports = { books };

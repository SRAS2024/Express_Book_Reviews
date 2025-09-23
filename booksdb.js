let books = {
  "9780143127741": {
    title: "Educated",
    author: "Tara Westover",
    reviews: {
      Alice: { text: "An inspiring story of resilience and learning.", rating: 5 },
      Bob: { text: "Difficult but transformative read.", rating: 4 },
      Carla: { text: "Made me reflect on my own education.", rating: 5 },
      David: { text: "A bit slow in parts, but powerful.", rating: 4 },
      Emma: { text: "One of my favorites of the decade.", rating: 5 }
    }
  },
  "9780141991738": {
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    reviews: {
      Alice: { text: "A poetic blend of science and spirit.", rating: 5 },
      Bob: { text: "Deeply moving and healing.", rating: 5 },
      Carla: { text: "Changed how I view the natural world.", rating: 5 },
      David: { text: "Some chapters are slow, but worth it.", rating: 4 },
      Emma: { text: "A must-read for anyone who loves nature.", rating: 5 }
    }
  },
  "9780743273565": {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    reviews: {
      Frank: { text: "Timeless prose and themes.", rating: 5 },
      Gina: { text: "Overrated in my opinion.", rating: 3 },
      Helen: { text: "Beautiful and tragic.", rating: 5 },
      Ian: { text: "Loved the symbolism and characters.", rating: 5 },
      Jill: { text: "Not my favorite classic.", rating: 4 }
    }
  },
  "9780307476708": {
    title: "The Road",
    author: "Cormac McCarthy",
    reviews: {
      Alice: { text: "Bleak but unforgettable.", rating: 5 },
      Bob: { text: "Hard to read, but worth it.", rating: 4 },
      Carla: { text: "Beautiful in its darkness.", rating: 5 },
      David: { text: "Too depressing for me.", rating: 3 },
      Emma: { text: "One of the most moving books I’ve read.", rating: 5 }
    }
  },
  "9780061120084": {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    reviews: {
      Frank: { text: "A masterpiece of justice and compassion.", rating: 5 },
      Gina: { text: "Still relevant today.", rating: 5 },
      Helen: { text: "Atticus Finch is my hero.", rating: 5 },
      Ian: { text: "Every student should read this.", rating: 5 },
      Jill: { text: "Loved it as a teen, love it now.", rating: 5 }
    }
  },
  "9781501124020": {
    title: "The Righteous Mind",
    author: "Jonathan Haidt",
    reviews: {
      Alice: { text: "Made me rethink morality.", rating: 5 },
      Bob: { text: "A bit academic, but brilliant.", rating: 4 },
      Carla: { text: "Explains so much about politics.", rating: 5 },
      David: { text: "Dense, but rewarding.", rating: 4 },
      Emma: { text: "Should be required reading.", rating: 5 }
    }
  },
  "9780812981605": {
    title: "Infidel",
    author: "Ayaan Hirsi Ali",
    reviews: {
      Frank: { text: "Courageous and eye-opening.", rating: 5 },
      Gina: { text: "Some parts were tough.", rating: 4 },
      Helen: { text: "An important voice.", rating: 5 },
      Ian: { text: "Made me think deeply.", rating: 5 },
      Jill: { text: "Powerful memoir.", rating: 5 }
    }
  },
  "9780062316110": {
    title: "The Alchemist",
    author: "Paulo Coelho",
    reviews: {
      Alice: { text: "Life-changing parable.", rating: 5 },
      Bob: { text: "Overhyped, but nice.", rating: 4 },
      Carla: { text: "Simple yet profound.", rating: 5 },
      David: { text: "Didn’t connect with it.", rating: 3 },
      Emma: { text: "Read it every year.", rating: 5 }
    }
  },
  "9780385349949": {
    title: "The Martian",
    author: "Andy Weir",
    reviews: {
      Frank: { text: "Funny and nerdy.", rating: 5 },
      Gina: { text: "Loved the science detail.", rating: 5 },
      Helen: { text: "A thrilling survival story.", rating: 5 },
      Ian: { text: "Too much technical detail.", rating: 4 },
      Jill: { text: "Great book and movie.", rating: 5 }
    }
  },
  "9780679734529": {
    title: "Beloved",
    author: "Toni Morrison",
    reviews: {
      Alice: { text: "Haunting and unforgettable.", rating: 5 },
      Bob: { text: "Hard to read but powerful.", rating: 5 },
      Carla: { text: "Morrison is a genius.", rating: 5 },
      David: { text: "Not for everyone.", rating: 4 },
      Emma: { text: "A classic that shook me.", rating: 5 }
    }
  },
  "9780451524935": {
    title: "1984",
    author: "George Orwell",
    reviews: {
      Frank: { text: "Still relevant.", rating: 5 },
      Gina: { text: "Terrifying vision.", rating: 5 },
      Helen: { text: "Scarily accurate.", rating: 5 },
      Ian: { text: "Loved it.", rating: 5 },
      Jill: { text: "Everyone should read.", rating: 5 }
    }
  },
  "9780316769488": {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    reviews: {
      Alice: { text: "Relatable teen angst.", rating: 4 },
      Bob: { text: "Holden is annoying.", rating: 3 },
      Carla: { text: "Classic, but dated.", rating: 4 },
      David: { text: "Loved it as a teen.", rating: 5 },
      Emma: { text: "Overrated.", rating: 3 }
    }
  },
  "9780385490818": {
    title: "Into Thin Air",
    author: "Jon Krakauer",
    reviews: {
      Frank: { text: "Thrilling and tragic.", rating: 5 },
      Gina: { text: "Couldn’t put it down.", rating: 5 },
      Helen: { text: "Scary but amazing.", rating: 5 },
      Ian: { text: "Too detailed in parts.", rating: 4 },
      Jill: { text: "A must-read for adventure fans.", rating: 5 }
    }
  },
  "9780307588371": {
    title: "Unbroken",
    author: "Laura Hillenbrand",
    reviews: {
      Alice: { text: "Inspiring true story.", rating: 5 },
      Bob: { text: "Heartbreaking but beautiful.", rating: 5 },
      Carla: { text: "Loved the resilience.", rating: 5 },
      David: { text: "A bit long.", rating: 4 },
      Emma: { text: "Top 10 memoir for me.", rating: 5 }
    }
  },
  "9780307277671": {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    reviews: {
      Frank: { text: "Heart-wrenching.", rating: 5 },
      Gina: { text: "Made me cry.", rating: 5 },
      Helen: { text: "A masterpiece.", rating: 5 },
      Ian: { text: "Beautifully written.", rating: 5 },
      Jill: { text: "Loved it.", rating: 5 }
    }
  }
};

module.exports = books;

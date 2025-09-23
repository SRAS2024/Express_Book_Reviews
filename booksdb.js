let books = {
  "9780143127741": {
    title: "Educated",
    author: "Tara Westover",
    reviews: {
      alice: { text: "An inspiring story of resilience and learning.", rating: 5 },
      bob: { text: "Difficult but transformative read.", rating: 4 },
      carla: { text: "Made me reflect on my own education.", rating: 5 },
      david: { text: "A bit slow in parts, but powerful.", rating: 4 },
      emma: { text: "One of my favorites of the decade.", rating: 5 }
    }
  },
  "9780141991738": {
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    reviews: {
      alice: { text: "A poetic blend of science and spirit.", rating: 5 },
      bob: { text: "Deeply moving and healing.", rating: 5 },
      carla: { text: "Changed how I view the natural world.", rating: 5 },
      david: { text: "Some chapters are slow, but worth it.", rating: 4 },
      emma: { text: "A must-read for anyone who loves nature.", rating: 5 }
    }
  },
  "9780743273565": {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    reviews: {
      frank: { text: "Timeless prose and themes.", rating: 5 },
      gina: { text: "Overrated in my opinion.", rating: 3 },
      helen: { text: "Beautiful and tragic.", rating: 5 },
      ian: { text: "Loved the symbolism and characters.", rating: 5 },
      jill: { text: "Not my favorite classic.", rating: 4 }
    }
  },
  "9780307476708": {
    title: "The Road",
    author: "Cormac McCarthy",
    reviews: {
      alice: { text: "Bleak but unforgettable.", rating: 5 },
      bob: { text: "Hard to read, but worth it.", rating: 4 },
      carla: { text: "Beautiful in its darkness.", rating: 5 },
      david: { text: "Too depressing for me.", rating: 3 },
      emma: { text: "One of the most moving books I’ve read.", rating: 5 }
    }
  },
  "9780061120084": {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    reviews: {
      frank: { text: "A masterpiece of justice and compassion.", rating: 5 },
      gina: { text: "Still relevant today.", rating: 5 },
      helen: { text: "Atticus Finch is my hero.", rating: 5 },
      ian: { text: "Every student should read this.", rating: 5 },
      jill: { text: "Loved it as a teen, love it now.", rating: 5 }
    }
  },
  "9781501124020": {
    title: "The Righteous Mind",
    author: "Jonathan Haidt",
    reviews: {
      alice: { text: "Made me rethink morality.", rating: 5 },
      bob: { text: "A bit academic, but brilliant.", rating: 4 },
      carla: { text: "Explains so much about politics.", rating: 5 },
      david: { text: "Dense, but rewarding.", rating: 4 },
      emma: { text: "Should be required reading.", rating: 5 }
    }
  },
  "9780812981605": {
    title: "Infidel",
    author: "Ayaan Hirsi Ali",
    reviews: {
      frank: { text: "Courageous and eye-opening.", rating: 5 },
      gina: { text: "Some parts were tough.", rating: 4 },
      helen: { text: "An important voice.", rating: 5 },
      ian: { text: "Made me think deeply.", rating: 5 },
      jill: { text: "Powerful memoir.", rating: 5 }
    }
  },
  "9780062316110": {
    title: "The Alchemist",
    author: "Paulo Coelho",
    reviews: {
      alice: { text: "Life-changing parable.", rating: 5 },
      bob: { text: "Overhyped, but nice.", rating: 4 },
      carla: { text: "Simple yet profound.", rating: 5 },
      david: { text: "Didn’t connect with it.", rating: 3 },
      emma: { text: "Read it every year.", rating: 5 }
    }
  },
  "9780385349949": {
    title: "The Martian",
    author: "Andy Weir",
    reviews: {
      frank: { text: "Funny and nerdy.", rating: 5 },
      gina: { text: "Loved the science detail.", rating: 5 },
      helen: { text: "A thrilling survival story.", rating: 5 },
      ian: { text: "Too much technical detail.", rating: 4 },
      jill: { text: "Great book and movie.", rating: 5 }
    }
  },
  "9780679734529": {
    title: "Beloved",
    author: "Toni Morrison",
    reviews: {
      alice: { text: "Haunting and unforgettable.", rating: 5 },
      bob: { text: "Hard to read but powerful.", rating: 5 },
      carla: { text: "Morrison is a genius.", rating: 5 },
      david: { text: "Not for everyone.", rating: 4 },
      emma: { text: "A classic that shook me.", rating: 5 }
    }
  },
  "9780451524935": {
    title: "1984",
    author: "George Orwell",
    reviews: {
      frank: { text: "Still relevant.", rating: 5 },
      gina: { text: "Terrifying vision.", rating: 5 },
      helen: { text: "Scarily accurate.", rating: 5 },
      ian: { text: "Loved it.", rating: 5 },
      jill: { text: "Everyone should read.", rating: 5 }
    }
  },
  "9780316769488": {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    reviews: {
      alice: { text: "Relatable teen angst.", rating: 4 },
      bob: { text: "Holden is annoying.", rating: 3 },
      carla: { text: "Classic, but dated.", rating: 4 },
      david: { text: "Loved it as a teen.", rating: 5 },
      emma: { text: "Overrated.", rating: 3 }
    }
  },
  "9780385490818": {
    title: "Into Thin Air",
    author: "Jon Krakauer",
    reviews: {
      frank: { text: "Thrilling and tragic.", rating: 5 },
      gina: { text: "Couldn’t put it down.", rating: 5 },
      helen: { text: "Scary but amazing.", rating: 5 },
      ian: { text: "Too detailed in parts.", rating: 4 },
      jill: { text: "A must-read for adventure fans.", rating: 5 }
    }
  },
  "9780307588371": {
    title: "Unbroken",
    author: "Laura Hillenbrand",
    reviews: {
      alice: { text: "Inspiring true story.", rating: 5 },
      bob: { text: "Heartbreaking but beautiful.", rating: 5 },
      carla: { text: "Loved the resilience.", rating: 5 },
      david: { text: "A bit long.", rating: 4 },
      emma: { text: "Top 10 memoir for me.", rating: 5 }
    }
  },
  "9780307277671": {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    reviews: {
      frank: { text: "Heart-wrenching.", rating: 5 },
      gina: { text: "Made me cry.", rating: 5 },
      helen: { text: "A masterpiece.", rating: 5 },
      ian: { text: "Beautifully written.", rating: 5 },
      jill: { text: "Loved it.", rating: 5 }
    }
  }
};

module.exports = books;

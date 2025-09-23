let books = {
  "9780143127741": {
    title: "Educated",
    author: "Tara Westover",
    reviews: {
      alice: "An inspiring story of resilience and learning. ★★★★★",
      bob: "Difficult but transformative read. ★★★★☆",
      carla: "Made me reflect on my own education. ★★★★★",
      david: "A bit slow in parts, but powerful. ★★★★☆",
      emma: "One of my favorites of the decade. ★★★★★"
    }
  },
  "9780141991738": {
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    reviews: {
      alice: "A poetic blend of science and spirit. ★★★★★",
      bob: "Deeply moving and healing. ★★★★★",
      carla: "Changed how I view the natural world. ★★★★★",
      david: "Some chapters are slow, but worth it. ★★★★☆",
      emma: "A must-read for anyone who loves nature. ★★★★★"
    }
  },
  "9780743273565": {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    reviews: {
      frank: "Timeless prose and themes. ★★★★★",
      gina: "Overrated in my opinion. ★★★☆☆",
      helen: "Beautiful and tragic. ★★★★★",
      ian: "Loved the symbolism and characters. ★★★★★",
      jill: "Not my favorite classic. ★★★★☆"
    }
  },
  "9780307476708": {
    title: "The Road",
    author: "Cormac McCarthy",
    reviews: {
      alice: "Bleak but unforgettable. ★★★★★",
      bob: "Hard to read, but worth it. ★★★★☆",
      carla: "Beautiful in its darkness. ★★★★★",
      david: "Too depressing for me. ★★★☆☆",
      emma: "One of the most moving books I’ve read. ★★★★★"
    }
  },
  "9780061120084": {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    reviews: {
      frank: "A masterpiece of justice and compassion. ★★★★★",
      gina: "Still relevant today. ★★★★★",
      helen: "Atticus Finch is my hero. ★★★★★",
      ian: "Every student should read this. ★★★★★",
      jill: "Loved it as a teen, love it now. ★★★★★"
    }
  },
  "9781501124020": {
    title: "The Righteous Mind",
    author: "Jonathan Haidt",
    reviews: {
      alice: "Made me rethink morality. ★★★★★",
      bob: "A bit academic, but brilliant. ★★★★☆",
      carla: "Explains so much about politics. ★★★★★",
      david: "Dense, but rewarding. ★★★★☆",
      emma: "Should be required reading. ★★★★★"
    }
  },
  "9780812981605": {
    title: "Infidel",
    author: "Ayaan Hirsi Ali",
    reviews: {
      frank: "Courageous and eye-opening. ★★★★★",
      gina: "Some parts were tough. ★★★★☆",
      helen: "An important voice. ★★★★★",
      ian: "Made me think deeply. ★★★★★",
      jill: "Powerful memoir. ★★★★★"
    }
  },
  "9780062316110": {
    title: "The Alchemist",
    author: "Paulo Coelho",
    reviews: {
      alice: "Life-changing parable. ★★★★★",
      bob: "Overhyped, but nice. ★★★★☆",
      carla: "Simple yet profound. ★★★★★",
      david: "Didn’t connect with it. ★★★☆☆",
      emma: "Read it every year. ★★★★★"
    }
  },
  "9780385349949": {
    title: "The Martian",
    author: "Andy Weir",
    reviews: {
      frank: "Funny and nerdy. ★★★★★",
      gina: "Loved the science detail. ★★★★★",
      helen: "A thrilling survival story. ★★★★★",
      ian: "Too much technical detail. ★★★★☆",
      jill: "Great book and movie. ★★★★★"
    }
  },
  "9780679734529": {
    title: "Beloved",
    author: "Toni Morrison",
    reviews: {
      alice: "Haunting and unforgettable. ★★★★★",
      bob: "Hard to read but powerful. ★★★★★",
      carla: "Morrison is a genius. ★★★★★",
      david: "Not for everyone. ★★★★☆",
      emma: "A classic that shook me. ★★★★★"
    }
  },
  "9780451524935": {
    title: "1984",
    author: "George Orwell",
    reviews: {
      frank: "Still relevant. ★★★★★",
      gina: "Terrifying vision. ★★★★★",
      helen: "Scarily accurate. ★★★★★",
      ian: "Loved it. ★★★★★",
      jill: "Everyone should read. ★★★★★"
    }
  },
  "9780316769488": {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    reviews: {
      alice: "Relatable teen angst. ★★★★☆",
      bob: "Holden is annoying. ★★★☆☆",
      carla: "Classic, but dated. ★★★★☆",
      david: "Loved it as a teen. ★★★★★",
      emma: "Overrated. ★★★☆☆"
    }
  },
  "9780385490818": {
    title: "Into Thin Air",
    author: "Jon Krakauer",
    reviews: {
      frank: "Thrilling and tragic. ★★★★★",
      gina: "Couldn’t put it down. ★★★★★",
      helen: "Scary but amazing. ★★★★★",
      ian: "Too detailed in parts. ★★★★☆",
      jill: "A must-read for adventure fans. ★★★★★"
    }
  },
  "9780307588371": {
    title: "Unbroken",
    author: "Laura Hillenbrand",
    reviews: {
      alice: "Inspiring true story. ★★★★★",
      bob: "Heartbreaking but beautiful. ★★★★★",
      carla: "Loved the resilience. ★★★★★",
      david: "A bit long. ★★★★☆",
      emma: "Top 10 memoir for me. ★★★★★"
    }
  },
  "9780307277671": {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    reviews: {
      frank: "Heart-wrenching. ★★★★★",
      gina: "Made me cry. ★★★★★",
      helen: "A masterpiece. ★★★★★",
      ian: "Beautifully written. ★★★★★",
      jill: "Loved it. ★★★★★"
    }
  }
};

module.exports = books;

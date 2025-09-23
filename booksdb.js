let books = {
  "9780143127741": {
    title: "Educated",
    author: "Tara Westover",
    isbn: "9780143127741",
    reviews: {
      user1: "★★★★★ Life-changing memoir, deeply inspiring.",
      user2: "★★★★☆ Raw and emotional.",
      user3: "★★★★★ Could not put it down.",
      user4: "★★★★☆ Powerful but heavy at times.",
      user5: "★★★★★ Everyone should read this."
    }
  },
  "9780143127796": {
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    isbn: "9780143127796",
    reviews: {
      user1: "★★★★★ Beautiful and spiritual.",
      user2: "★★★★★ Changed my view of nature.",
      user3: "★★★★☆ A little dense in places.",
      user4: "★★★★★ Deeply poetic.",
      user5: "★★★★★ A gift to the world."
    }
  },
  "9780743273565": {
    title: "Infidel",
    author: "Ayaan Hirsi Ali",
    isbn: "9780743273565",
    reviews: {
      user1: "★★★★★ Brave and compelling.",
      user2: "★★★★☆ Harsh truths, important read.",
      user3: "★★★★★ Incredible life story.",
      user4: "★★★★☆ Eye-opening.",
      user5: "★★★★★ Powerful testimony."
    }
  },
  "9780804137386": {
    title: "Essentialism",
    author: "Greg McKeown",
    isbn: "9780804137386",
    reviews: {
      user1: "★★★★★ Life-changing productivity book.",
      user2: "★★★★☆ Very practical.",
      user3: "★★★★★ Helps simplify life.",
      user4: "★★★★☆ Repetitive at times.",
      user5: "★★★★★ Must-read for focus."
    }
  },
  "9780735211292": {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    reviews: {
      user1: "★★★★★ The best book on habits.",
      user2: "★★★★★ Practical and easy to apply.",
      user3: "★★★★☆ Some parts obvious, but useful.",
      user4: "★★★★★ Transformative.",
      user5: "★★★★★ Essential self-improvement guide."
    }
  },
  "9780307455772": {
    title: "The Righteous Mind",
    author: "Jonathan Haidt",
    isbn: "9780307455772",
    reviews: {
      user1: "★★★★★ Fascinating insights.",
      user2: "★★★★☆ Dense but rewarding.",
      user3: "★★★★★ Changed how I see politics.",
      user4: "★★★★☆ Eye-opening psychology.",
      user5: "★★★★★ Brilliant work."
    }
  },
  "9781458727348": {
    title: "The Untethered Soul",
    author: "Michael A. Singer",
    isbn: "9781458727348",
    reviews: {
      user1: "★★★★★ Spiritually awakening.",
      user2: "★★★★☆ A bit abstract at times.",
      user3: "★★★★★ Deep and meaningful.",
      user4: "★★★★☆ Requires reflection.",
      user5: "★★★★★ Beautifully written."
    }
  },
  "9780807047415": {
    title: "White Fragility",
    author: "Robin DiAngelo",
    isbn: "9780807047415",
    reviews: {
      user1: "★★★★★ Challenging but important.",
      user2: "★★★★☆ Eye-opening.",
      user3: "★★★★★ Necessary perspective.",
      user4: "★★★★☆ Tough but worth it.",
      user5: "★★★★★ Powerful message."
    }
  },
  "9780385265560": {
    title: "There Are No Children Here",
    author: "Alex Kotlowitz",
    isbn: "9780385265560",
    reviews: {
      user1: "★★★★★ Heartbreaking but vital.",
      user2: "★★★★★ Brilliant reporting.",
      user3: "★★★★☆ Sad but true.",
      user4: "★★★★★ Touching and raw.",
      user5: "★★★★★ A must-read."
    }
  },
  "9780140449334": {
    title: "Meditations",
    author: "Marcus Aurelius",
    isbn: "9780140449334",
    reviews: {
      user1: "★★★★★ Timeless wisdom.",
      user2: "★★★★★ Stoic masterpiece.",
      user3: "★★★★☆ Can feel repetitive.",
      user4: "★★★★★ Grounding and wise.",
      user5: "★★★★★ Life-changing philosophy."
    }
  },
  "9780061122415": {
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "9780061122415",
    reviews: {
      user1: "★★★★★ Magical story.",
      user2: "★★★★☆ Simple but inspiring.",
      user3: "★★★★★ Changed my perspective.",
      user4: "★★★★☆ Overhyped but good.",
      user5: "★★★★★ Spiritual journey."
    }
  },
  "9780671027032": {
    title: "Tuesdays with Morrie",
    author: "Mitch Albom",
    isbn: "9780671027032",
    reviews: {
      user1: "★★★★★ Emotional and deep.",
      user2: "★★★★★ Beautiful story.",
      user3: "★★★★☆ A bit sentimental.",
      user4: "★★★★★ Makes you reflect.",
      user5: "★★★★★ Wonderful life lessons."
    }
  },
  "9780743297332": {
    title: "The Road",
    author: "Cormac McCarthy",
    isbn: "9780743297332",
    reviews: {
      user1: "★★★★★ Dark and moving.",
      user2: "★★★★☆ Hauntingly written.",
      user3: "★★★★★ Incredible prose.",
      user4: "★★★★☆ Depressing but brilliant.",
      user5: "★★★★★ Masterpiece."
    }
  },
  "9780316769488": {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769488",
    reviews: {
      user1: "★★★★★ Iconic classic.",
      user2: "★★★★☆ Relatable youth themes.",
      user3: "★★★★★ Great narrative voice.",
      user4: "★★★★☆ Overrated by some.",
      user5: "★★★★★ Timeless coming-of-age story."
    }
  },
  "9780451524935": {
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    reviews: {
      user1: "★★★★★ Chilling and prophetic.",
      user2: "★★★★★ Still relevant today.",
      user3: "★★★★☆ Bleak but important.",
      user4: "★★★★★ Brilliant dystopia.",
      user5: "★★★★★ Everyone should read this."
    }
  }
};

module.exports = books;

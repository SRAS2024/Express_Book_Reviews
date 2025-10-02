let books = {
  "9780143127741": {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
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
    genre: "Nature Writing",
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
    genre: "Classic",
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
    genre: "Post-Apocalyptic",
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
    genre: "Classic",
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
    genre: "Psychology",
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
    genre: "Memoir",
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
    genre: "Fiction",
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
    genre: "Science Fiction",
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
    genre: "Literary Fiction",
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
    genre: "Dystopian",
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
    genre: "Classic",
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
    genre: "Adventure",
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
    genre: "Biography",
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
    genre: "Literary Fiction",
    reviews: {
      Frank: { text: "Heart-wrenching.", rating: 5 },
      Gina: { text: "Made me cry.", rating: 5 },
      Helen: { text: "A masterpiece.", rating: 5 },
      Ian: { text: "Beautifully written.", rating: 5 },
      Jill: { text: "Loved it.", rating: 5 }
    }
  },
  "9780618640157": {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Epic storytelling at its best.", rating: 5 },
      Bob: { text: "A little dense but worth it.", rating: 4 },
      Carla: { text: "Loved the characters.", rating: 5 },
      David: { text: "Takes time to get going.", rating: 4 },
      Emma: { text: "My favorite fantasy ever.", rating: 5 }
    }
  },
  "9780618574940": {
    title: "The Lord of the Rings: The Two Towers",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "The battle scenes are incredible.", rating: 5 },
      Gina: { text: "Even better than the first book.", rating: 5 },
      Helen: { text: "A true classic of fantasy.", rating: 5 },
      Ian: { text: "Very detailed but rewarding.", rating: 4 },
      Jill: { text: "I could read it again and again.", rating: 5 }
    }
  },
  "9780618260553": {
    title: "The Lord of the Rings: The Return of the King",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "A breathtaking finale.", rating: 5 },
      Bob: { text: "Truly epic conclusion.", rating: 5 },
      Carla: { text: "I cried at the ending.", rating: 5 },
      David: { text: "Slow at times, but powerful.", rating: 4 },
      Emma: { text: "One of the best endings ever.", rating: 5 }
    }
  }
};
Object.assign(books, {
  "9780439554930": {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "A magical introduction to Hogwarts.", rating: 5 },
      Bob: { text: "Fun and imaginative.", rating: 4 },
      Carla: { text: "Made me fall in love with reading.", rating: 5 },
      David: { text: "Perfect for children and adults.", rating: 5 },
      Emma: { text: "The start of something legendary.", rating: 5 }
    }
  },
  "9780439064873": {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Even darker and better than the first.", rating: 5 },
      Gina: { text: "Love Dobby’s introduction.", rating: 4 },
      Helen: { text: "Scary but wonderful.", rating: 5 },
      Ian: { text: "Kept me hooked.", rating: 5 },
      Jill: { text: "Not my favorite in the series, but good.", rating: 4 }
    }
  },
  "9780439136365": {
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Sirius Black is unforgettable.", rating: 5 },
      Bob: { text: "Best twist so far.", rating: 5 },
      Carla: { text: "My favorite of the early books.", rating: 5 },
      David: { text: "Time travel element was fun.", rating: 4 },
      Emma: { text: "Dark and thrilling.", rating: 5 }
    }
  },
  "9780439139601": {
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "The Triwizard Tournament was amazing.", rating: 5 },
      Gina: { text: "The ending shocked me.", rating: 5 },
      Helen: { text: "Huge turning point in the series.", rating: 5 },
      Ian: { text: "A bit long, but excellent.", rating: 4 },
      Jill: { text: "Cedric Diggory was great.", rating: 5 }
    }
  },
  "9780439358071": {
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Emotional and powerful.", rating: 5 },
      Bob: { text: "Harry’s anger was relatable.", rating: 4 },
      Carla: { text: "Loved Luna Lovegood.", rating: 5 },
      David: { text: "Dolores Umbridge was terrifying.", rating: 5 },
      Emma: { text: "Longest book, but worth it.", rating: 5 }
    }
  },
  "9780439785969": {
    title: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Dark and heartbreaking.", rating: 5 },
      Gina: { text: "The ending destroyed me.", rating: 5 },
      Helen: { text: "Snape’s character deepens.", rating: 5 },
      Ian: { text: "Very intense.", rating: 4 },
      Jill: { text: "Brilliant and tragic.", rating: 5 }
    }
  },
  "9780545139700": {
    title: "Harry Potter and the Deathly Hallows",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "An epic conclusion.", rating: 5 },
      Bob: { text: "I cried multiple times.", rating: 5 },
      Carla: { text: "Incredible ending to a saga.", rating: 5 },
      David: { text: "A little rushed in places.", rating: 4 },
      Emma: { text: "My favorite finale of any series.", rating: 5 }
    }
  },
  "9780439023528": {
    title: "Catching Fire",
    author: "Suzanne Collins",
    genre: "Dystopian",
    reviews: {
      Frank: { text: "Loved the Quarter Quell.", rating: 5 },
      Gina: { text: "Even better than the first.", rating: 5 },
      Helen: { text: "So suspenseful.", rating: 5 },
      Ian: { text: "Amazing character growth.", rating: 5 },
      Jill: { text: "Couldn’t stop reading.", rating: 5 }
    }
  },
  "9780439023511": {
    title: "Mockingjay",
    author: "Suzanne Collins",
    genre: "Dystopian",
    reviews: {
      Alice: { text: "Very dark but powerful.", rating: 5 },
      Bob: { text: "Not the ending I expected.", rating: 4 },
      Carla: { text: "Katniss is inspiring.", rating: 5 },
      David: { text: "Sad but fitting conclusion.", rating: 5 },
      Emma: { text: "A brutal but real ending.", rating: 4 }
    }
  },
  "9780553380163": {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Complex and gripping.", rating: 5 },
      Gina: { text: "So many characters!", rating: 4 },
      Helen: { text: "Loved the intrigue.", rating: 5 },
      Ian: { text: "A bit heavy at times.", rating: 4 },
      Jill: { text: "Brilliant world-building.", rating: 5 }
    }
  },
  "9780553579901": {
    title: "A Clash of Kings",
    author: "George R.R. Martin",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "The stakes keep rising.", rating: 5 },
      Bob: { text: "Very intense battles.", rating: 5 },
      Carla: { text: "Loved Tyrion’s arc.", rating: 5 },
      David: { text: "A little slow in spots.", rating: 4 },
      Emma: { text: "Incredible continuation.", rating: 5 }
    }
  },
  "9780553573428": {
    title: "A Storm of Swords",
    author: "George R.R. Martin",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "The Red Wedding shocked me.", rating: 5 },
      Gina: { text: "Best in the series so far.", rating: 5 },
      Helen: { text: "Absolutely devastating.", rating: 5 },
      Ian: { text: "Couldn’t put it down.", rating: 5 },
      Jill: { text: "So much happens!", rating: 5 }
    }
  },
  "9780553801507": {
    title: "A Feast for Crows",
    author: "George R.R. Martin",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "More political intrigue.", rating: 4 },
      Bob: { text: "A bit slower paced.", rating: 3 },
      Carla: { text: "Still interesting.", rating: 4 },
      David: { text: "Not as strong as previous.", rating: 3 },
      Emma: { text: "Necessary setup for later.", rating: 4 }
    }
  },
  "9780553801477": {
    title: "A Dance with Dragons",
    author: "George R.R. Martin",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Epic but sprawling.", rating: 4 },
      Gina: { text: "Dragons finally shine.", rating: 5 },
      Helen: { text: "Great moments, but long.", rating: 4 },
      Ian: { text: "Hard to keep track of.", rating: 3 },
      Jill: { text: "Still worth the journey.", rating: 4 }
    }
  },
  "9780307346605": {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    genre: "Mystery/Thriller",
    reviews: {
      Alice: { text: "Gripping and dark.", rating: 5 },
      Bob: { text: "Loved Lisbeth Salander.", rating: 5 },
      Carla: { text: "Disturbing but excellent.", rating: 4 },
      David: { text: "A bit graphic at times.", rating: 4 },
      Emma: { text: "Couldn’t stop turning pages.", rating: 5 }
    }
  },
  "9780307949486": {
    title: "The Girl Who Played with Fire",
    author: "Stieg Larsson",
    genre: "Mystery/Thriller",
    reviews: {
      Frank: { text: "An amazing sequel.", rating: 5 },
      Gina: { text: "Intense and fast-paced.", rating: 5 },
      Helen: { text: "I liked it more than book one.", rating: 5 },
      Ian: { text: "Dark and violent.", rating: 4 },
      Jill: { text: "Absolutely gripping.", rating: 5 }
    }
  },
  "9780307739964": {
    title: "The Girl Who Kicked the Hornet's Nest",
    author: "Stieg Larsson",
    genre: "Mystery/Thriller",
    reviews: {
      Alice: { text: "A strong finish to the trilogy.", rating: 5 },
      Bob: { text: "Satisfying conclusion.", rating: 5 },
      Carla: { text: "Very thrilling.", rating: 5 },
      David: { text: "A little drawn out.", rating: 4 },
      Emma: { text: "Loved every moment.", rating: 5 }
    }
  }
});
Object.assign(books, {
  "9780307588364": {
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Thriller",
    reviews: {
      Alice: { text: "Unpredictable and chilling.", rating: 5 },
      Bob: { text: "Couldn’t put it down.", rating: 5 },
      Carla: { text: "Dark psychological twists.", rating: 5 },
      David: { text: "Both characters were unlikeable.", rating: 4 },
      Emma: { text: "The ending shocked me.", rating: 5 }
    }
  },
  "9780385537858": {
    title: "The Goldfinch",
    author: "Donna Tartt",
    genre: "Literary Fiction",
    reviews: {
      Frank: { text: "Beautifully written.", rating: 5 },
      Gina: { text: "A bit long, but worth it.", rating: 4 },
      Helen: { text: "Theo’s story stuck with me.", rating: 5 },
      Ian: { text: "Heavy, but rewarding.", rating: 4 },
      Jill: { text: "Haunting and vivid.", rating: 5 }
    }
  },
  "9780307348135": {
    title: "Water for Elephants",
    author: "Sara Gruen",
    genre: "Historical Fiction",
    reviews: {
      Alice: { text: "Loved the circus setting.", rating: 5 },
      Bob: { text: "Beautiful romance.", rating: 5 },
      Carla: { text: "Some parts were sad.", rating: 4 },
      David: { text: "Unique and well-told.", rating: 5 },
      Emma: { text: "Charming story.", rating: 4 }
    }
  },
  "9780060850524": {
    title: "The Book Thief",
    author: "Markus Zusak",
    genre: "Historical Fiction",
    reviews: {
      Frank: { text: "Narrated by Death was brilliant.", rating: 5 },
      Gina: { text: "I cried so much.", rating: 5 },
      Helen: { text: "Incredibly moving.", rating: 5 },
      Ian: { text: "A modern classic.", rating: 5 },
      Jill: { text: "One of the best WWII stories.", rating: 5 }
    }
  },
  "9780142424179": {
    title: "The Fault in Our Stars",
    author: "John Green",
    genre: "Young Adult",
    reviews: {
      Alice: { text: "So emotional.", rating: 5 },
      Bob: { text: "Made me cry.", rating: 5 },
      Carla: { text: "Beautiful love story.", rating: 5 },
      David: { text: "A bit manipulative but good.", rating: 4 },
      Emma: { text: "Heartbreaking.", rating: 5 }
    }
  },
  "9780142415436": {
    title: "Looking for Alaska",
    author: "John Green",
    genre: "Young Adult",
    reviews: {
      Frank: { text: "Unique and touching.", rating: 5 },
      Gina: { text: "Loved the characters.", rating: 4 },
      Helen: { text: "A little pretentious, but good.", rating: 3 },
      Ian: { text: "Very emotional.", rating: 5 },
      Jill: { text: "Thought-provoking.", rating: 4 }
    }
  },
  "9780385474542": {
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genre: "Classic",
    reviews: {
      Alice: { text: "Powerful and important.", rating: 5 },
      Bob: { text: "Opened my eyes to African literature.", rating: 5 },
      Carla: { text: "Tragic and moving.", rating: 5 },
      David: { text: "Difficult but essential.", rating: 4 },
      Emma: { text: "A must-read.", rating: 5 }
    }
  },
  "9780143038412": {
    title: "Middlesex",
    author: "Jeffrey Eugenides",
    genre: "Literary Fiction",
    reviews: {
      Frank: { text: "Brilliant and layered.", rating: 5 },
      Gina: { text: "Very original story.", rating: 5 },
      Helen: { text: "Takes patience but worth it.", rating: 4 },
      Ian: { text: "Deeply moving.", rating: 5 },
      Jill: { text: "A masterpiece.", rating: 5 }
    }
  },
  "9780316015844": {
    title: "Twilight",
    author: "Stephenie Meyer",
    genre: "Young Adult Fantasy",
    reviews: {
      Alice: { text: "Fun guilty pleasure.", rating: 4 },
      Bob: { text: "Not great writing, but addictive.", rating: 3 },
      Carla: { text: "Loved it as a teen.", rating: 5 },
      David: { text: "Very cheesy.", rating: 2 },
      Emma: { text: "Still entertaining.", rating: 4 }
    }
  },
  "9780316160193": {
    title: "New Moon",
    author: "Stephenie Meyer",
    genre: "Young Adult Fantasy",
    reviews: {
      Frank: { text: "Bella’s depression felt real.", rating: 4 },
      Gina: { text: "Missed Edward in most of it.", rating: 3 },
      Helen: { text: "Still liked the story.", rating: 4 },
      Ian: { text: "Jacob was better here.", rating: 4 },
      Jill: { text: "Dark but engaging.", rating: 4 }
    }
  },
  "9780316160209": {
    title: "Eclipse",
    author: "Stephenie Meyer",
    genre: "Young Adult Fantasy",
    reviews: {
      Alice: { text: "The love triangle intensifies.", rating: 4 },
      Bob: { text: "Lots of tension.", rating: 4 },
      Carla: { text: "Fun read.", rating: 4 },
      David: { text: "Dragged a bit.", rating: 3 },
      Emma: { text: "Still entertaining.", rating: 4 }
    }
  },
  "9780316067928": {
    title: "Breaking Dawn",
    author: "Stephenie Meyer",
    genre: "Young Adult Fantasy",
    reviews: {
      Frank: { text: "Wild finale.", rating: 4 },
      Gina: { text: "Strange plot twists.", rating: 3 },
      Helen: { text: "Still satisfying.", rating: 4 },
      Ian: { text: "Over the top but fun.", rating: 3 },
      Jill: { text: "Good conclusion.", rating: 4 }
    }
  },
  "9780375703768": {
    title: "Life of Pi",
    author: "Yann Martel",
    genre: "Adventure",
    reviews: {
      Alice: { text: "Incredible survival story.", rating: 5 },
      Bob: { text: "Made me think deeply.", rating: 5 },
      Carla: { text: "Loved the symbolism.", rating: 5 },
      David: { text: "A little slow at times.", rating: 4 },
      Emma: { text: "Brilliantly written.", rating: 5 }
    }
  },
  "9780143111580": {
    title: "Eat, Pray, Love",
    author: "Elizabeth Gilbert",
    genre: "Memoir",
    reviews: {
      Frank: { text: "Very inspiring.", rating: 5 },
      Gina: { text: "Felt a little self-indulgent.", rating: 3 },
      Helen: { text: "Made me want to travel.", rating: 5 },
      Ian: { text: "Romantic and reflective.", rating: 4 },
      Jill: { text: "A fun journey.", rating: 4 }
    }
  },
  "9780061122415": {
    title: "Freakonomics",
    author: "Steven D. Levitt & Stephen J. Dubner",
    genre: "Non-Fiction",
    reviews: {
      Alice: { text: "Fascinating insights.", rating: 5 },
      Bob: { text: "Made economics fun.", rating: 5 },
      Carla: { text: "Very eye-opening.", rating: 5 },
      David: { text: "A little scattered.", rating: 4 },
      Emma: { text: "Entertaining and smart.", rating: 5 }
    }
  },
  "9780385504201": {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Thriller",
    reviews: {
      Frank: { text: "Fast-paced and fun.", rating: 5 },
      Gina: { text: "Historically questionable.", rating: 3 },
      Helen: { text: "A page-turner.", rating: 5 },
      Ian: { text: "Very cinematic.", rating: 4 },
      Jill: { text: "Loved the mystery.", rating: 5 }
    }
  },
  "9780307474278": {
    title: "Inferno",
    author: "Dan Brown",
    genre: "Thriller",
    reviews: {
      Alice: { text: "Thrilling chase.", rating: 4 },
      Bob: { text: "Not his best but good.", rating: 3 },
      Carla: { text: "Loved the setting in Florence.", rating: 5 },
      David: { text: "Twists kept me going.", rating: 4 },
      Emma: { text: "Exciting but over the top.", rating: 3 }
    }
  },
  "9780385514231": {
    title: "Angels & Demons",
    author: "Dan Brown",
    genre: "Thriller",
    reviews: {
      Frank: { text: "Better than The Da Vinci Code.", rating: 5 },
      Gina: { text: "Exciting plot.", rating: 5 },
      Helen: { text: "Loved the Vatican intrigue.", rating: 5 },
      Ian: { text: "A little unbelievable.", rating: 4 },
      Jill: { text: "Couldn’t put it down.", rating: 5 }
    }
  }
});
Object.assign(books, {
  "9780743226721": {
    title: "The Five People You Meet in Heaven",
    author: "Mitch Albom",
    genre: "Fiction",
    reviews: {
      Alice: { text: "Heartwarming and touching.", rating: 5 },
      Bob: { text: "Simple but meaningful.", rating: 4 },
      Carla: { text: "Made me reflect on life.", rating: 5 },
      David: { text: "A bit sentimental.", rating: 3 },
      Emma: { text: "Beautifully written.", rating: 5 }
    }
  },
  "9781400032716": {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    genre: "Literary Fiction",
    reviews: {
      Frank: { text: "Heartbreaking and powerful.", rating: 5 },
      Gina: { text: "Couldn’t put it down.", rating: 5 },
      Helen: { text: "A deeply emotional story.", rating: 5 },
      Ian: { text: "Hard to read at times.", rating: 4 },
      Jill: { text: "A masterpiece.", rating: 5 }
    }
  },
  "9781594633669": {
    title: "And the Mountains Echoed",
    author: "Khaled Hosseini",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Beautiful and layered.", rating: 5 },
      Bob: { text: "Multiple perspectives were interesting.", rating: 4 },
      Carla: { text: "Not as good as his first, but strong.", rating: 4 },
      David: { text: "Some parts dragged.", rating: 3 },
      Emma: { text: "Still moving and thoughtful.", rating: 4 }
    }
  },
  "9780385490818": {
    title: "Into Thin Air",
    author: "Jon Krakauer",
    genre: "Adventure",
    reviews: {
      Frank: { text: "Thrilling and tragic.", rating: 5 },
      Gina: { text: "Couldn’t put it down.", rating: 5 },
      Helen: { text: "Scary but amazing.", rating: 5 },
      Ian: { text: "Too detailed in parts.", rating: 4 },
      Jill: { text: "A must-read for adventure fans.", rating: 5 }
    }
  },
  "9780385494786": {
    title: "Into the Wild",
    author: "Jon Krakauer",
    genre: "Biography",
    reviews: {
      Alice: { text: "Inspiring yet tragic.", rating: 5 },
      Bob: { text: "Chris McCandless’ story was unforgettable.", rating: 5 },
      Carla: { text: "Made me question society.", rating: 4 },
      David: { text: "A bit idealized, but moving.", rating: 3 },
      Emma: { text: "A haunting tale.", rating: 5 }
    }
  },
  "9780385340570": {
    title: "The Help",
    author: "Kathryn Stockett",
    genre: "Historical Fiction",
    reviews: {
      Frank: { text: "Very moving.", rating: 5 },
      Gina: { text: "Funny and emotional.", rating: 5 },
      Helen: { text: "Loved the characters.", rating: 5 },
      Ian: { text: "A bit idealized but good.", rating: 4 },
      Jill: { text: "An important story.", rating: 5 }
    }
  },
  "9780553296983": {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    reviews: {
      Alice: { text: "Incredible world-building.", rating: 5 },
      Bob: { text: "Dense but rewarding.", rating: 4 },
      Carla: { text: "A sci-fi masterpiece.", rating: 5 },
      David: { text: "Hard to get into at first.", rating: 4 },
      Emma: { text: "Changed sci-fi forever.", rating: 5 }
    }
  },
  "9780441172719": {
    title: "Dune Messiah",
    author: "Frank Herbert",
    genre: "Science Fiction",
    reviews: {
      Frank: { text: "A darker continuation.", rating: 4 },
      Gina: { text: "Not as strong as the first.", rating: 3 },
      Helen: { text: "Still very good.", rating: 4 },
      Ian: { text: "Philosophical and deep.", rating: 4 },
      Jill: { text: "Essential for Dune fans.", rating: 4 }
    }
  },
  "9780441013593": {
    title: "Children of Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    reviews: {
      Alice: { text: "Epic continuation.", rating: 5 },
      Bob: { text: "Loved the Atreides family arcs.", rating: 5 },
      Carla: { text: "A bit confusing.", rating: 3 },
      David: { text: "Challenging but rewarding.", rating: 4 },
      Emma: { text: "Still excellent.", rating: 5 }
    }
  },
  "9780452284241": {
    title: "Memoirs of a Geisha",
    author: "Arthur Golden",
    genre: "Historical Fiction",
    reviews: {
      Frank: { text: "Richly detailed.", rating: 5 },
      Gina: { text: "Beautiful prose.", rating: 5 },
      Helen: { text: "A little romanticized.", rating: 4 },
      Ian: { text: "Loved learning about geishas.", rating: 5 },
      Jill: { text: "A classic modern novel.", rating: 5 }
    }
  },
  "9780345803481": {
    title: "Fifty Shades of Grey",
    author: "E. L. James",
    genre: "Romance",
    reviews: {
      Alice: { text: "Not my type, but entertaining.", rating: 3 },
      Bob: { text: "Poorly written but addictive.", rating: 2 },
      Carla: { text: "Spicy and fun.", rating: 4 },
      David: { text: "Controversial but popular.", rating: 3 },
      Emma: { text: "Opened a new genre for many.", rating: 3 }
    }
  },
  "9780316015844": {
    title: "Twilight",
    author: "Stephenie Meyer",
    genre: "Young Adult Fantasy",
    reviews: {
      Frank: { text: "Fun guilty pleasure.", rating: 4 },
      Gina: { text: "Not great writing, but addictive.", rating: 3 },
      Helen: { text: "Loved it as a teen.", rating: 5 },
      Ian: { text: "Very cheesy.", rating: 2 },
      Jill: { text: "Still entertaining.", rating: 4 }
    }
  },
  "9780679783268": {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    reviews: {
      Alice: { text: "One of the best romances ever.", rating: 5 },
      Bob: { text: "Elizabeth Bennet is iconic.", rating: 5 },
      Carla: { text: "Mr. Darcy stole my heart.", rating: 5 },
      David: { text: "Language was hard at first.", rating: 4 },
      Emma: { text: "Still fresh centuries later.", rating: 5 }
    }
  },
  "9780743273565": {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    reviews: {
      Frank: { text: "Timeless prose and themes.", rating: 5 },
      Gina: { text: "Overrated in my opinion.", rating: 3 },
      Helen: { text: "Beautiful and tragic.", rating: 5 },
      Ian: { text: "Loved the symbolism and characters.", rating: 5 },
      Jill: { text: "Not my favorite classic.", rating: 4 }
    }
  },
  "9781451673319": {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Dystopian",
    reviews: {
      Alice: { text: "Chilling vision of censorship.", rating: 5 },
      Bob: { text: "Still relevant today.", rating: 5 },
      Carla: { text: "Quick but powerful read.", rating: 5 },
      David: { text: "Loved the prose.", rating: 5 },
      Emma: { text: "A must-read classic.", rating: 5 }
    }
  },
  "9780060850524": {
    title: "The Book Thief",
    author: "Markus Zusak",
    genre: "Historical Fiction",
    reviews: {
      Frank: { text: "Narrated by Death was brilliant.", rating: 5 },
      Gina: { text: "I cried so much.", rating: 5 },
      Helen: { text: "Incredibly moving.", rating: 5 },
      Ian: { text: "A modern classic.", rating: 5 },
      Jill: { text: "One of the best WWII stories.", rating: 5 }
    }
  },
  "9781501139154": {
    title: "It",
    author: "Stephen King",
    genre: "Horror",
    reviews: {
      Alice: { text: "Absolutely terrifying.", rating: 5 },
      Bob: { text: "Too long, but amazing.", rating: 4 },
      Carla: { text: "Pennywise is iconic.", rating: 5 },
      David: { text: "Creepy and unforgettable.", rating: 5 },
      Emma: { text: "Classic King horror.", rating: 5 }
    }
  }
});
Object.assign(books, {
  "9780307743657": {
    title: "11/22/63",
    author: "Stephen King",
    genre: "Historical Fiction",
    reviews: {
      Alice: { text: "A thrilling time travel story.", rating: 5 },
      Bob: { text: "Loved the mix of history and fiction.", rating: 5 },
      Carla: { text: "A bit long but rewarding.", rating: 4 },
      David: { text: "King at his best.", rating: 5 },
      Emma: { text: "Amazing alternate history novel.", rating: 5 }
    }
  },
  "9780385533225": {
    title: "The Night Circus",
    author: "Erin Morgenstern",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Magical and atmospheric.", rating: 5 },
      Gina: { text: "Loved the romance.", rating: 5 },
      Helen: { text: "The descriptions were beautiful.", rating: 5 },
      Ian: { text: "Slow at times but worth it.", rating: 4 },
      Jill: { text: "One of my favorite fantasies.", rating: 5 }
    }
  },
  "9780385545969": {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Inspiring and comforting.", rating: 5 },
      Bob: { text: "Made me reflect on choices.", rating: 5 },
      Carla: { text: "A bit repetitive but good.", rating: 4 },
      David: { text: "Loved the concept.", rating: 5 },
      Emma: { text: "Very uplifting.", rating: 5 }
    }
  },
  "9780307271037": {
    title: "The Road",
    author: "Cormac McCarthy",
    genre: "Post-Apocalyptic",
    reviews: {
      Frank: { text: "Bleak but unforgettable.", rating: 5 },
      Gina: { text: "Very dark but powerful.", rating: 5 },
      Helen: { text: "Sad and haunting.", rating: 5 },
      Ian: { text: "Not for everyone.", rating: 4 },
      Jill: { text: "Beautiful writing.", rating: 5 }
    }
  },
  "9780307346605": {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    genre: "Thriller",
    reviews: {
      Alice: { text: "Dark and gripping mystery.", rating: 5 },
      Bob: { text: "Loved Lisbeth’s character.", rating: 5 },
      Carla: { text: "Disturbing but excellent.", rating: 4 },
      David: { text: "Compelling story.", rating: 4 },
      Emma: { text: "Couldn’t put it down.", rating: 5 }
    }
  },
  "9780062024037": {
    title: "Divergent",
    author: "Veronica Roth",
    genre: "Dystopian",
    reviews: {
      Frank: { text: "Fast-paced and fun.", rating: 5 },
      Gina: { text: "Similar to Hunger Games but good.", rating: 4 },
      Helen: { text: "Great YA dystopia.", rating: 5 },
      Ian: { text: "Predictable but exciting.", rating: 4 },
      Jill: { text: "Loved Tris and Four.", rating: 5 }
    }
  },
  "9780062024044": {
    title: "Insurgent",
    author: "Veronica Roth",
    genre: "Dystopian",
    reviews: {
      Alice: { text: "Good continuation.", rating: 4 },
      Bob: { text: "Not as strong as the first.", rating: 3 },
      Carla: { text: "Still engaging.", rating: 4 },
      David: { text: "Dragged in places.", rating: 3 },
      Emma: { text: "Enjoyed it overall.", rating: 4 }
    }
  },
  "9780062024051": {
    title: "Allegiant",
    author: "Veronica Roth",
    genre: "Dystopian",
    reviews: {
      Frank: { text: "Controversial ending.", rating: 3 },
      Gina: { text: "Didn’t like the twist.", rating: 2 },
      Helen: { text: "Bold but upsetting.", rating: 3 },
      Ian: { text: "Felt rushed.", rating: 3 },
      Jill: { text: "Still glad I finished.", rating: 3 }
    }
  },
  "9780385722209": {
    title: "Atonement",
    author: "Ian McEwan",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Beautifully tragic.", rating: 5 },
      Bob: { text: "Heartbreaking story.", rating: 5 },
      Carla: { text: "Amazing prose.", rating: 5 },
      David: { text: "Slow at the start.", rating: 4 },
      Emma: { text: "An unforgettable book.", rating: 5 }
    }
  },
  "9781400031702": {
    title: "The Lovely Bones",
    author: "Alice Sebold",
    genre: "Literary Fiction",
    reviews: {
      Frank: { text: "Sad but beautifully written.", rating: 5 },
      Gina: { text: "Unique perspective.", rating: 5 },
      Helen: { text: "Disturbing but powerful.", rating: 4 },
      Ian: { text: "Haunting story.", rating: 5 },
      Jill: { text: "Stayed with me.", rating: 5 }
    }
  },
  "9780380730407": {
    title: "American Gods",
    author: "Neil Gaiman",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Weird but brilliant.", rating: 5 },
      Bob: { text: "Loved the mythology.", rating: 5 },
      Carla: { text: "Confusing at times.", rating: 4 },
      David: { text: "Very creative.", rating: 5 },
      Emma: { text: "Classic Gaiman.", rating: 5 }
    }
  },
  "9780060558123": {
    title: "Coraline",
    author: "Neil Gaiman",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Creepy but fun.", rating: 5 },
      Gina: { text: "Loved the atmosphere.", rating: 5 },
      Helen: { text: "Perfect children’s horror.", rating: 5 },
      Ian: { text: "Scared me even as an adult.", rating: 4 },
      Jill: { text: "Great dark fairytale.", rating: 5 }
    }
  },
  "9780743455964": {
    title: "Angels & Demons",
    author: "Dan Brown",
    genre: "Thriller",
    reviews: {
      Alice: { text: "Very exciting.", rating: 5 },
      Bob: { text: "Better than Da Vinci Code.", rating: 5 },
      Carla: { text: "Great mystery.", rating: 5 },
      David: { text: "A little unbelievable.", rating: 4 },
      Emma: { text: "Couldn’t stop reading.", rating: 5 }
    }
  },
  "9780385472579": {
    title: "The Secret History",
    author: "Donna Tartt",
    genre: "Literary Fiction",
    reviews: {
      Frank: { text: "Dark and fascinating.", rating: 5 },
      Gina: { text: "Loved the characters.", rating: 5 },
      Helen: { text: "Slow burn but brilliant.", rating: 5 },
      Ian: { text: "Not for everyone.", rating: 4 },
      Jill: { text: "Haunting story.", rating: 5 }
    }
  },
  "9780140283334": {
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Melancholic and beautiful.", rating: 5 },
      Bob: { text: "Very moving.", rating: 5 },
      Carla: { text: "Loved Murakami’s style.", rating: 5 },
      David: { text: "Sad but brilliant.", rating: 5 },
      Emma: { text: "A haunting read.", rating: 5 }
    }
  },
  "9780679775430": {
    title: "Kafka on the Shore",
    author: "Haruki Murakami",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Strange but brilliant.", rating: 5 },
      Gina: { text: "Magical realism at its best.", rating: 5 },
      Helen: { text: "Weird but engrossing.", rating: 4 },
      Ian: { text: "Murakami is unique.", rating: 5 },
      Jill: { text: "One of my favorites.", rating: 5 }
    }
  },
  "9780679732761": {
    title: "The Wind-Up Bird Chronicle",
    author: "Haruki Murakami",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Complex but rewarding.", rating: 5 },
      Bob: { text: "So surreal and strange.", rating: 5 },
      Carla: { text: "Loved it, though long.", rating: 4 },
      David: { text: "Murakami at his best.", rating: 5 },
      Emma: { text: "Unique and brilliant.", rating: 5 }
    }
  },
  "9780451526342": {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    reviews: {
      Frank: { text: "Simple but profound.", rating: 5 },
      Gina: { text: "Still very relevant.", rating: 5 },
      Helen: { text: "Quick read but impactful.", rating: 5 },
      Ian: { text: "Loved the allegory.", rating: 5 },
      Jill: { text: "Orwell is a genius.", rating: 5 }
    }
  },
  "9780060850524": {
    title: "The Book Thief",
    author: "Markus Zusak",
    genre: "Historical Fiction",
    reviews: {
      Alice: { text: "Narrated by Death was brilliant.", rating: 5 },
      Bob: { text: "Cried through the ending.", rating: 5 },
      Carla: { text: "A must-read modern classic.", rating: 5 },
      David: { text: "Deeply emotional.", rating: 5 },
      Emma: { text: "Still haunts me.", rating: 5 }
    }
  }
});

module.exports = books;

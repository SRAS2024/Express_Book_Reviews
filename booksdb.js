let books = {
  "9780399590504": {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    reviews: {
      Alice: { text: "A raw and inspiring story of perseverance.", rating: 5 },
      Bob: { text: "Challenging but rewarding.", rating: 4 },
      Carla: { text: "Made me reflect deeply on education.", rating: 5 },
      David: { text: "At times difficult, but very powerful.", rating: 4 },
      Emma: { text: "One of the best memoirs I’ve read.", rating: 5 }
    }
  },
  "9781571313560": {
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    genre: "Nature Writing",
    reviews: {
      Frank: { text: "A poetic blend of science and spirituality.", rating: 5 },
      Gina: { text: "It changed how I see the natural world.", rating: 5 },
      Helen: { text: "Deeply moving and healing.", rating: 5 },
      Ian: { text: "Some sections were slower, but worth it.", rating: 4 },
      Jill: { text: "A must-read for lovers of nature.", rating: 5 }
    }
  },
  "9780743273565": {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    reviews: {
      Alice: { text: "Haunting and tragic, yet beautiful.", rating: 5 },
      Bob: { text: "Didn’t connect with the characters.", rating: 3 },
      Carla: { text: "A timeless exploration of the American Dream.", rating: 5 },
      David: { text: "Symbolism is brilliant.", rating: 5 },
      Emma: { text: "A little overrated, but still classic.", rating: 4 }
    }
  },
  "9780307387899": {
    title: "The Road",
    author: "Cormac McCarthy",
    genre: "Post-Apocalyptic",
    reviews: {
      Frank: { text: "Bleak but unforgettable.", rating: 5 },
      Gina: { text: "Heart-wrenching and haunting.", rating: 5 },
      Helen: { text: "Difficult to read but worth it.", rating: 4 },
      Ian: { text: "Dark but beautifully written.", rating: 5 },
      Jill: { text: "Emotionally exhausting.", rating: 4 }
    }
  },
  "9780061120084": {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    reviews: {
      Alice: { text: "A masterpiece of justice and compassion.", rating: 5 },
      Bob: { text: "Still relevant decades later.", rating: 5 },
      Carla: { text: "Atticus Finch is unforgettable.", rating: 5 },
      David: { text: "Loved reading this in school.", rating: 5 },
      Emma: { text: "A timeless classic.", rating: 5 }
    }
  },
  "9780316168816": {
    title: "The Lovely Bones",
    author: "Alice Sebold",
    genre: "Literary Fiction",
    reviews: {
      Frank: { text: "Unique and emotional perspective.", rating: 5 },
      Gina: { text: "Very sad but well written.", rating: 4 },
      Helen: { text: "Haunting but powerful.", rating: 5 },
      Ian: { text: "Not an easy read, but memorable.", rating: 4 },
      Jill: { text: "A heartbreaking story.", rating: 5 }
    }
  },
  "9780385721790": {
    title: "Atonement",
    author: "Ian McEwan",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Tragic and gorgeously written.", rating: 5 },
      Bob: { text: "Made me cry.", rating: 5 },
      Carla: { text: "Loved the historical detail.", rating: 4 },
      David: { text: "Emotionally devastating.", rating: 5 },
      Emma: { text: "One of McEwan’s finest works.", rating: 5 }
    }
  },
  "9780451524935": {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    reviews: {
      Frank: { text: "Still chillingly relevant.", rating: 5 },
      Gina: { text: "Scarily accurate predictions.", rating: 5 },
      Helen: { text: "A must-read classic.", rating: 5 },
      Ian: { text: "Terrifying vision of control.", rating: 5 },
      Jill: { text: "One of my favorite classics.", rating: 5 }
    }
  },
  "9780316769488": {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Classic",
    reviews: {
      Alice: { text: "Captures teenage angst perfectly.", rating: 4 },
      Bob: { text: "Holden annoyed me.", rating: 3 },
      Carla: { text: "Relatable and raw.", rating: 4 },
      David: { text: "Loved it as a teen.", rating: 5 },
      Emma: { text: "Not my favorite classic.", rating: 3 }
    }
  },
  "9781594631931": {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    genre: "Literary Fiction",
    reviews: {
      Frank: { text: "Devastating but beautiful.", rating: 5 },
      Gina: { text: "Made me cry.", rating: 5 },
      Helen: { text: "Hosseini is a master storyteller.", rating: 5 },
      Ian: { text: "Emotionally powerful.", rating: 5 },
      Jill: { text: "Heart-wrenching and unforgettable.", rating: 5 }
    }
  },
  "9780547928219": {
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Epic storytelling.", rating: 5 },
      Bob: { text: "Dense but rewarding.", rating: 4 },
      Carla: { text: "Loved the characters.", rating: 5 },
      David: { text: "A slow start but great.", rating: 4 },
      Emma: { text: "A masterpiece of fantasy.", rating: 5 }
    }
  },
  "9780547928202": {
    title: "The Two Towers",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Loved the battle scenes.", rating: 5 },
      Gina: { text: "Even better than the first book.", rating: 5 },
      Helen: { text: "Classic fantasy at its best.", rating: 5 },
      Ian: { text: "Very detailed, but worth it.", rating: 4 },
      Jill: { text: "My favorite of the trilogy.", rating: 5 }
    }
  },
  "9780547928196": {
    title: "The Return of the King",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "An epic conclusion.", rating: 5 },
      Bob: { text: "Truly unforgettable.", rating: 5 },
      Carla: { text: "Cried at the ending.", rating: 5 },
      David: { text: "A perfect finale.", rating: 5 },
      Emma: { text: "The best ending to a series.", rating: 5 }
    }
  },
  "9780590353427": {
    title: "Harry Potter and the Sorcerer’s Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "A magical beginning.", rating: 5 },
      Gina: { text: "Loved the world-building.", rating: 5 },
      Helen: { text: "Made me fall in love with reading.", rating: 5 },
      Ian: { text: "Fun for all ages.", rating: 5 },
      Jill: { text: "Perfect start to the series.", rating: 5 }
    }
  },
  "9780439064873": {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Darker than the first.", rating: 5 },
      Bob: { text: "Loved Dobby’s introduction.", rating: 4 },
      Carla: { text: "Great continuation.", rating: 5 },
      David: { text: "Scary but wonderful.", rating: 5 },
      Emma: { text: "A fun sequel.", rating: 4 }
    }
  },
  "9780439136365": {
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Best twist in the series.", rating: 5 },
      Gina: { text: "Loved Sirius Black.", rating: 5 },
      Helen: { text: "Time travel was brilliant.", rating: 5 },
      Ian: { text: "Darker and more mature.", rating: 4 },
      Jill: { text: "My favorite HP book.", rating: 5 }
    }
  },
  "9780439139601": {
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Triwizard Tournament was thrilling.", rating: 5 },
      Bob: { text: "So much happens!", rating: 5 },
      Carla: { text: "Loved it.", rating: 5 },
      David: { text: "A bit long but great.", rating: 4 },
      Emma: { text: "Exciting and dark.", rating: 5 }
    }
  },
  "9780439358071": {
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Loved Luna Lovegood.", rating: 5 },
      Gina: { text: "Umbridge is the worst villain ever.", rating: 5 },
      Helen: { text: "Harry’s anger was realistic.", rating: 4 },
      Ian: { text: "Long but powerful.", rating: 4 },
      Jill: { text: "Emotional ending.", rating: 5 }
    }
  },
  "9780439785969": {
    title: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "The ending destroyed me.", rating: 5 },
      Bob: { text: "Dark and emotional.", rating: 5 },
      Carla: { text: "Voldemort’s past was fascinating.", rating: 5 },
      David: { text: "Romance was a bit much.", rating: 3 },
      Emma: { text: "Best mix of humor and darkness.", rating: 5 }
    }
  },
  "9780545139709": {
    title: "Harry Potter and the Deathly Hallows",
    author: "J.K. Rowling",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Epic finale.", rating: 5 },
      Gina: { text: "Loved the Battle of Hogwarts.", rating: 5 },
      Helen: { text: "The ending was perfect.", rating: 5 },
      Ian: { text: "Some parts dragged.", rating: 4 },
      Jill: { text: "I cried at the end.", rating: 5 }
    }
  }
};
Object.assign(books, {
  "9780812974492": {
    title: "Unbroken",
    author: "Laura Hillenbrand",
    genre: "Biography",
    reviews: {
      Alice: { text: "Inspiring resilience and courage.", rating: 5 },
      Bob: { text: "A long but rewarding story.", rating: 4 },
      Carla: { text: "Heartbreaking yet uplifting.", rating: 5 },
      David: { text: "One of the most powerful memoirs.", rating: 5 },
      Emma: { text: "An unforgettable true story.", rating: 5 }
    }
  },
  "9781400052189": {
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    genre: "Biography",
    reviews: {
      Frank: { text: "An eye-opening true story.", rating: 5 },
      Gina: { text: "Fascinating blend of science and ethics.", rating: 5 },
      Helen: { text: "Important and unforgettable.", rating: 5 },
      Ian: { text: "Dense in parts but worth it.", rating: 4 },
      Jill: { text: "A story everyone should know.", rating: 5 }
    }
  },
  "9780060930530": {
    title: "The Poisonwood Bible",
    author: "Barbara Kingsolver",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Complex and moving family saga.", rating: 5 },
      Bob: { text: "Loved the multiple narrators.", rating: 5 },
      Carla: { text: "Dense but rewarding.", rating: 4 },
      David: { text: "Thought-provoking and tragic.", rating: 5 },
      Emma: { text: "A masterpiece of cultural clash.", rating: 5 }
    }
  },
  "9780143034902": {
    title: "The Shadow of the Wind",
    author: "Carlos Ruiz Zafón",
    genre: "Mystery",
    reviews: {
      Frank: { text: "Atmospheric and enchanting.", rating: 5 },
      Gina: { text: "A gothic love letter to books.", rating: 5 },
      Helen: { text: "Immersive storytelling.", rating: 5 },
      Ian: { text: "A little slow at first.", rating: 4 },
      Jill: { text: "A true masterpiece.", rating: 5 }
    }
  },
  "9780307474278": {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Thriller",
    reviews: {
      Alice: { text: "Fast-paced page-turner.", rating: 5 },
      Bob: { text: "Historically loose but fun.", rating: 4 },
      Carla: { text: "Couldn’t stop reading.", rating: 5 },
      David: { text: "Very cinematic writing style.", rating: 4 },
      Emma: { text: "A thrilling adventure.", rating: 5 }
    }
  },
  "9780316015844": {
    title: "Twilight",
    author: "Stephenie Meyer",
    genre: "Young Adult Fantasy",
    reviews: {
      Frank: { text: "A guilty pleasure.", rating: 4 },
      Gina: { text: "Writing is weak but addictive.", rating: 3 },
      Helen: { text: "Loved it as a teen.", rating: 5 },
      Ian: { text: "Cheesy but fun.", rating: 3 },
      Jill: { text: "Still entertaining.", rating: 4 }
    }
  },
  "9780316160193": {
    title: "New Moon",
    author: "Stephenie Meyer",
    genre: "Young Adult Fantasy",
    reviews: {
      Alice: { text: "Jacob’s arc was great.", rating: 4 },
      Bob: { text: "Missed Edward.", rating: 3 },
      Carla: { text: "Bella’s struggles felt raw.", rating: 4 },
      David: { text: "Not as engaging as the first.", rating: 3 },
      Emma: { text: "Still pulled me in.", rating: 4 }
    }
  },
  "9780316027656": {
    title: "Eclipse",
    author: "Stephenie Meyer",
    genre: "Young Adult Fantasy",
    reviews: {
      Frank: { text: "Loved the vampire-werewolf rivalry.", rating: 4 },
      Gina: { text: "Too much drama for me.", rating: 3 },
      Helen: { text: "Lots of action.", rating: 4 },
      Ian: { text: "Good setup for the finale.", rating: 4 },
      Jill: { text: "One of the better Twilight books.", rating: 5 }
    }
  },
  "9780316067928": {
    title: "Breaking Dawn",
    author: "Stephenie Meyer",
    genre: "Young Adult Fantasy",
    reviews: {
      Alice: { text: "A wild finale.", rating: 4 },
      Bob: { text: "Too over the top for me.", rating: 3 },
      Carla: { text: "Loved the closure.", rating: 4 },
      David: { text: "Some parts dragged.", rating: 3 },
      Emma: { text: "Bittersweet but satisfying.", rating: 4 }
    }
  },
  "9780446310789": {
    title: "Go Set a Watchman",
    author: "Harper Lee",
    genre: "Classic",
    reviews: {
      Frank: { text: "Interesting companion to Mockingbird.", rating: 3 },
      Gina: { text: "Not as strong as her first.", rating: 3 },
      Helen: { text: "Shocking character changes.", rating: 4 },
      Ian: { text: "Important for context.", rating: 3 },
      Jill: { text: "A controversial release.", rating: 3 }
    }
  },
  "9780743496176": {
    title: "Angels & Demons",
    author: "Dan Brown",
    genre: "Thriller",
    reviews: {
      Alice: { text: "Even better than Da Vinci Code.", rating: 5 },
      Bob: { text: "Over the top, but fun.", rating: 4 },
      Carla: { text: "Nonstop action.", rating: 5 },
      David: { text: "Cinematic and gripping.", rating: 4 },
      Emma: { text: "Loved the twists.", rating: 5 }
    }
  },
  "9780307887443": {
    title: "Ready Player One",
    author: "Ernest Cline",
    genre: "Science Fiction",
    reviews: {
      Frank: { text: "Pure nostalgia trip.", rating: 5 },
      Gina: { text: "A geek’s dream.", rating: 5 },
      Helen: { text: "Fast-paced and fun.", rating: 4 },
      Ian: { text: "A bit cheesy but enjoyable.", rating: 4 },
      Jill: { text: "One of my favorites.", rating: 5 }
    }
  },
  "9780812981605": {
    title: "Infidel",
    author: "Ayaan Hirsi Ali",
    genre: "Memoir",
    reviews: {
      Alice: { text: "Courageous and eye-opening.", rating: 5 },
      Bob: { text: "Some parts were tough.", rating: 4 },
      Carla: { text: "An important voice.", rating: 5 },
      David: { text: "Made me think deeply.", rating: 5 },
      Emma: { text: "Powerful memoir.", rating: 5 }
    }
  },
  "9780307588371": {
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Thriller",
    reviews: {
      Frank: { text: "Twists blew my mind.", rating: 5 },
      Gina: { text: "Dark but addictive.", rating: 5 },
      Helen: { text: "Couldn’t put it down.", rating: 5 },
      Ian: { text: "Disturbing characters.", rating: 4 },
      Jill: { text: "Perfectly paced thriller.", rating: 5 }
    }
  },
  "9780062315006": {
    title: "The Goldfinch",
    author: "Donna Tartt",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Haunting and beautiful.", rating: 5 },
      Bob: { text: "Overly long, but rewarding.", rating: 4 },
      Carla: { text: "Incredible character depth.", rating: 5 },
      David: { text: "Sad but unforgettable.", rating: 4 },
      Emma: { text: "Loved Tartt’s writing.", rating: 5 }
    }
  },
  "9780385737951": {
    title: "Looking for Alaska",
    author: "John Green",
    genre: "Young Adult",
    reviews: {
      Frank: { text: "Heartbreaking and profound.", rating: 5 },
      Gina: { text: "John Green at his best.", rating: 5 },
      Helen: { text: "A story that lingers.", rating: 5 },
      Ian: { text: "Sad but meaningful.", rating: 4 },
      Jill: { text: "Loved it.", rating: 5 }
    }
  },
  "9780525555377": {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Atmospheric and moving.", rating: 5 },
      Bob: { text: "Great mix of mystery and nature.", rating: 5 },
      Carla: { text: "Loved the marsh setting.", rating: 5 },
      David: { text: "Sad but beautiful.", rating: 4 },
      Emma: { text: "Couldn’t put it down.", rating: 5 }
    }
  },
  "9780553386790": {
    title: "A Game of Thrones",
    author: "George R. R. Martin",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Epic world-building.", rating: 5 },
      Gina: { text: "Brutal but brilliant.", rating: 5 },
      Helen: { text: "Loved the politics.", rating: 5 },
      Ian: { text: "So many characters to follow.", rating: 4 },
      Jill: { text: "The best fantasy saga opener.", rating: 5 }
    }
  },
  "9780553381696": {
    title: "A Clash of Kings",
    author: "George R. R. Martin",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Bigger and bloodier.", rating: 5 },
      Bob: { text: "Loved Tyrion’s arc.", rating: 5 },
      Carla: { text: "Slow in some parts.", rating: 4 },
      David: { text: "An amazing continuation.", rating: 5 },
      Emma: { text: "Even better than book one.", rating: 5 }
    }
  },
  "9780553381702": {
    title: "A Storm of Swords",
    author: "George R. R. Martin",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "The Red Wedding… wow.", rating: 5 },
      Gina: { text: "Shocking and devastating.", rating: 5 },
      Helen: { text: "Best in the series.", rating: 5 },
      Ian: { text: "Long but incredible.", rating: 5 },
      Jill: { text: "Unforgettable fantasy.", rating: 5 }
    }
  }
});
Object.assign(books, {
  "9780553801507": {
    title: "A Feast for Crows",
    author: "George R. R. Martin",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Slower but deep political intrigue.", rating: 4 },
      Bob: { text: "Fewer big moments but still rich.", rating: 4 },
      Carla: { text: "Loved Brienne’s chapters.", rating: 5 },
      David: { text: "Not the strongest, but essential.", rating: 3 },
      Emma: { text: "A different but rewarding entry.", rating: 4 }
    }
  },
  "9780553801477": {
    title: "A Dance with Dragons",
    author: "George R. R. Martin",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Massive and sprawling.", rating: 4 },
      Gina: { text: "Loved Jon Snow’s arc.", rating: 5 },
      Helen: { text: "Dragons were fantastic.", rating: 5 },
      Ian: { text: "Too many POVs, but still great.", rating: 3 },
      Jill: { text: "A huge but thrilling book.", rating: 4 }
    }
  },
  "9780439023481": {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    genre: "Young Adult Dystopian",
    reviews: {
      Alice: { text: "An addictive read.", rating: 5 },
      Bob: { text: "Katniss is unforgettable.", rating: 5 },
      Carla: { text: "Fast-paced and thrilling.", rating: 5 },
      David: { text: "Dark but brilliant.", rating: 4 },
      Emma: { text: "Loved the concept.", rating: 5 }
    }
  },
  "9780439023498": {
    title: "Catching Fire",
    author: "Suzanne Collins",
    genre: "Young Adult Dystopian",
    reviews: {
      Frank: { text: "Even better than the first.", rating: 5 },
      Gina: { text: "Loved the Quarter Quell.", rating: 5 },
      Helen: { text: "Unputdownable sequel.", rating: 5 },
      Ian: { text: "High stakes and tension.", rating: 5 },
      Jill: { text: "Amazing continuation.", rating: 5 }
    }
  },
  "9780439023511": {
    title: "Mockingjay",
    author: "Suzanne Collins",
    genre: "Young Adult Dystopian",
    reviews: {
      Alice: { text: "A heartbreaking finale.", rating: 5 },
      Bob: { text: "Darker and sadder than expected.", rating: 4 },
      Carla: { text: "Loved the ending.", rating: 5 },
      David: { text: "Not perfect, but powerful.", rating: 4 },
      Emma: { text: "A worthy conclusion.", rating: 5 }
    }
  },
  "9780062024039": {
    title: "Divergent",
    author: "Veronica Roth",
    genre: "Young Adult Dystopian",
    reviews: {
      Frank: { text: "Exciting and unique factions.", rating: 5 },
      Gina: { text: "Loved Tris and Four.", rating: 5 },
      Helen: { text: "Fast-paced and fun.", rating: 4 },
      Ian: { text: "Similar to Hunger Games but still good.", rating: 4 },
      Jill: { text: "A gripping start.", rating: 5 }
    }
  },
  "9780062024046": {
    title: "Insurgent",
    author: "Veronica Roth",
    genre: "Young Adult Dystopian",
    reviews: {
      Alice: { text: "Darker and more complex.", rating: 4 },
      Bob: { text: "Lots of twists.", rating: 4 },
      Carla: { text: "Loved the character development.", rating: 5 },
      David: { text: "Slower in places but good.", rating: 3 },
      Emma: { text: "A solid middle book.", rating: 4 }
    }
  },
  "9780062024060": {
    title: "Allegiant",
    author: "Veronica Roth",
    genre: "Young Adult Dystopian",
    reviews: {
      Frank: { text: "Controversial ending.", rating: 3 },
      Gina: { text: "Shocking finale.", rating: 4 },
      Helen: { text: "Didn’t love the direction.", rating: 3 },
      Ian: { text: "Unexpected and emotional.", rating: 4 },
      Jill: { text: "Bittersweet close to the trilogy.", rating: 3 }
    }
  }
});
Object.assign(books, {
  "9780385737951": {
    title: "The Maze Runner",
    author: "James Dashner",
    genre: "Young Adult Dystopian",
    reviews: {
      Alice: { text: "Fast-paced and exciting.", rating: 5 },
      Bob: { text: "Great concept, okay writing.", rating: 3 },
      Carla: { text: "Loved the mystery of the maze.", rating: 5 },
      David: { text: "Predictable but fun.", rating: 3 },
      Emma: { text: "Kept me hooked.", rating: 4 }
    }
  },
  "9780385738767": {
    title: "The Scorch Trials",
    author: "James Dashner",
    genre: "Young Adult Dystopian",
    reviews: {
      Frank: { text: "Action-packed sequel.", rating: 4 },
      Gina: { text: "A bit chaotic but entertaining.", rating: 3 },
      Helen: { text: "Loved the new settings.", rating: 4 },
      Ian: { text: "Not as good as the first.", rating: 3 },
      Jill: { text: "Still kept me reading.", rating: 4 }
    }
  },
  "9780385741552": {
    title: "The Death Cure",
    author: "James Dashner",
    genre: "Young Adult Dystopian",
    reviews: {
      Alice: { text: "Satisfying conclusion.", rating: 4 },
      Bob: { text: "Ending was rushed.", rating: 3 },
      Carla: { text: "Loved the closure.", rating: 4 },
      David: { text: "Not perfect but good.", rating: 3 },
      Emma: { text: "Emotional finale.", rating: 4 }
    }
  },
  "9780385742894": {
    title: "The Kill Order",
    author: "James Dashner",
    genre: "Young Adult Dystopian",
    reviews: {
      Frank: { text: "Interesting prequel.", rating: 4 },
      Gina: { text: "Didn’t need it, but fun.", rating: 3 },
      Helen: { text: "Added context to the world.", rating: 4 },
      Ian: { text: "Not as strong as main series.", rating: 3 },
      Jill: { text: "Good background story.", rating: 4 }
    }
  },
  "9780679783268": {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic Romance",
    reviews: {
      Alice: { text: "Witty and delightful.", rating: 5 },
      Bob: { text: "Loved Elizabeth Bennet.", rating: 5 },
      Carla: { text: "A timeless romance.", rating: 5 },
      David: { text: "Takes time to get into.", rating: 4 },
      Emma: { text: "Charming classic.", rating: 5 }
    }
  },
  "9780142437209": {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    genre: "Classic Romance",
    reviews: {
      Frank: { text: "Dark and emotional.", rating: 5 },
      Gina: { text: "Loved the gothic setting.", rating: 5 },
      Helen: { text: "Powerful heroine.", rating: 5 },
      Ian: { text: "Long but worth it.", rating: 4 },
      Jill: { text: "One of the best classics.", rating: 5 }
    }
  },
  "9780141439556": {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    genre: "Classic Romance",
    reviews: {
      Alice: { text: "Dark and intense.", rating: 5 },
      Bob: { text: "Hated the characters, loved the story.", rating: 4 },
      Carla: { text: "Hauntingly beautiful.", rating: 5 },
      David: { text: "Difficult but rewarding.", rating: 4 },
      Emma: { text: "A powerful classic.", rating: 5 }
    }
  },
  "9780143106654": {
    title: "Little Women",
    author: "Louisa May Alcott",
    genre: "Classic",
    reviews: {
      Frank: { text: "Heartwarming and sweet.", rating: 5 },
      Gina: { text: "Loved the March sisters.", rating: 5 },
      Helen: { text: "A bit sentimental, but lovely.", rating: 4 },
      Ian: { text: "Charming family story.", rating: 5 },
      Jill: { text: "A timeless comfort read.", rating: 5 }
    }
  },
  "9780142424179": {
    title: "The Fault in Our Stars",
    author: "John Green",
    genre: "Young Adult Romance",
    reviews: {
      Alice: { text: "Made me cry.", rating: 5 },
      Bob: { text: "Overhyped but good.", rating: 3 },
      Carla: { text: "Beautifully written.", rating: 5 },
      David: { text: "Sad but touching.", rating: 4 },
      Emma: { text: "Loved Hazel and Gus.", rating: 5 }
    }
  },
  "9780156027328": {
    title: "Life of Pi",
    author: "Yann Martel",
    genre: "Adventure Fiction",
    reviews: {
      Frank: { text: "Unique and imaginative.", rating: 5 },
      Gina: { text: "Loved the philosophy.", rating: 5 },
      Helen: { text: "Slow start but amazing.", rating: 4 },
      Ian: { text: "Magical storytelling.", rating: 5 },
      Jill: { text: "A moving book.", rating: 5 }
    }
  },
  "9780312330538": {
    title: "Shantaram",
    author: "Gregory David Roberts",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Epic and immersive.", rating: 5 },
      Bob: { text: "A bit long but amazing.", rating: 4 },
      Carla: { text: "Loved the characters.", rating: 5 },
      David: { text: "Philosophical and gripping.", rating: 5 },
      Emma: { text: "A modern classic.", rating: 5 }
    }
  },
  "9780375842207": {
    title: "The Book Thief",
    author: "Markus Zusak",
    genre: "Historical Fiction",
    reviews: {
      Frank: { text: "Narrated by Death, brilliant.", rating: 5 },
      Gina: { text: "Heartbreaking and beautiful.", rating: 5 },
      Helen: { text: "Unforgettable WWII story.", rating: 5 },
      Ian: { text: "Sad but powerful.", rating: 4 },
      Jill: { text: "One of my favorites.", rating: 5 }
    }
  },
  "9781476746586": {
    title: "All the Light We Cannot See",
    author: "Anthony Doerr",
    genre: "Historical Fiction",
    reviews: {
      Alice: { text: "Beautifully written.", rating: 5 },
      Bob: { text: "Loved the dual perspectives.", rating: 5 },
      Carla: { text: "A bit slow, but moving.", rating: 4 },
      David: { text: "Gorgeous prose.", rating: 5 },
      Emma: { text: "One of the best WWII novels.", rating: 5 }
    }
  },
  "9780307744432": {
    title: "The Night Circus",
    author: "Erin Morgenstern",
    genre: "Fantasy",
    reviews: {
      Frank: { text: "Magical and enchanting.", rating: 5 },
      Gina: { text: "Loved the atmosphere.", rating: 5 },
      Helen: { text: "Unique and imaginative.", rating: 5 },
      Ian: { text: "Slow in parts but worth it.", rating: 4 },
      Jill: { text: "A whimsical story.", rating: 5 }
    }
  },
  "9780316556347": {
    title: "Circe",
    author: "Madeline Miller",
    genre: "Fantasy",
    reviews: {
      Alice: { text: "Mythology retold beautifully.", rating: 5 },
      Bob: { text: "Loved Circe’s strength.", rating: 5 },
      Carla: { text: "A stunning novel.", rating: 5 },
      David: { text: "Magical and empowering.", rating: 5 },
      Emma: { text: "One of my favorites.", rating: 5 }
    }
  },
  "9781984822178": {
    title: "Normal People",
    author: "Sally Rooney",
    genre: "Literary Fiction",
    reviews: {
      Frank: { text: "Raw and realistic.", rating: 5 },
      Gina: { text: "Emotionally complex.", rating: 5 },
      Helen: { text: "Simple but powerful.", rating: 4 },
      Ian: { text: "Not for everyone, but I loved it.", rating: 5 },
      Jill: { text: "A modern masterpiece.", rating: 5 }
    }
  },
  "9780307455925": {
    title: "Americanah",
    author: "Chimamanda Ngozi Adichie",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Insightful and moving.", rating: 5 },
      Bob: { text: "Great cultural themes.", rating: 5 },
      Carla: { text: "Powerful storytelling.", rating: 5 },
      David: { text: "Eye-opening read.", rating: 5 },
      Emma: { text: "Loved Adichie’s writing.", rating: 5 }
    }
  },
  "9780062316096": {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "Nonfiction",
    reviews: {
      Frank: { text: "Fascinating and thought-provoking.", rating: 5 },
      Gina: { text: "Made me rethink history.", rating: 5 },
      Helen: { text: "Engagingly written.", rating: 5 },
      Ian: { text: "Some sweeping claims, but great.", rating: 4 },
      Jill: { text: "Changed how I see the world.", rating: 5 }
    }
  }
});
Object.assign(books, {
  "9780451526342": {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    reviews: {
      Alice: { text: "A clever allegory on power.", rating: 5 },
      Bob: { text: "Short but powerful.", rating: 5 },
      Carla: { text: "Still relevant today.", rating: 5 },
      David: { text: "Simple yet profound.", rating: 4 },
      Emma: { text: "A timeless satire.", rating: 5 }
    }
  },
  "9780199232765": {
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Historical Fiction",
    reviews: {
      Frank: { text: "Epic and sprawling.", rating: 5 },
      Gina: { text: "Intimidating length but rewarding.", rating: 4 },
      Helen: { text: "Unmatched character depth.", rating: 5 },
      Ian: { text: "A masterpiece of literature.", rating: 5 },
      Jill: { text: "One of the greatest novels ever.", rating: 5 }
    }
  },
  "9780140449136": {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    genre: "Philosophical Fiction",
    reviews: {
      Alice: { text: "Dark and intense exploration of guilt.", rating: 5 },
      Bob: { text: "A heavy but brilliant read.", rating: 4 },
      Carla: { text: "Loved Raskolnikov’s complexity.", rating: 5 },
      David: { text: "Philosophical and haunting.", rating: 5 },
      Emma: { text: "Deep and unforgettable.", rating: 5 }
    }
  },
  "9780374528379": {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    genre: "Philosophical Fiction",
    reviews: {
      Frank: { text: "A monumental novel.", rating: 5 },
      Gina: { text: "Explores faith and morality deeply.", rating: 5 },
      Helen: { text: "Dense but rewarding.", rating: 4 },
      Ian: { text: "My favorite Dostoevsky work.", rating: 5 },
      Jill: { text: "Profound and thought-provoking.", rating: 5 }
    }
  },
  "9780143035008": {
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    genre: "Classic Romance",
    reviews: {
      Alice: { text: "Beautiful yet tragic.", rating: 5 },
      Bob: { text: "One of the greatest love stories.", rating: 5 },
      Carla: { text: "Tolstoy’s writing is stunning.", rating: 5 },
      David: { text: "A bit slow but powerful.", rating: 4 },
      Emma: { text: "Tragic but unforgettable.", rating: 5 }
    }
  },
  "9780451419439": {
    title: "Les Misérables",
    author: "Victor Hugo",
    genre: "Historical Fiction",
    reviews: {
      Frank: { text: "Epic and emotional.", rating: 5 },
      Gina: { text: "Heartbreaking and beautiful.", rating: 5 },
      Helen: { text: "A true classic.", rating: 5 },
      Ian: { text: "Challenging but worth it.", rating: 4 },
      Jill: { text: "One of my favorite novels.", rating: 5 }
    }
  },
  "9780140268867": {
    title: "The Odyssey",
    author: "Homer",
    genre: "Epic Poetry",
    reviews: {
      Alice: { text: "An adventure like no other.", rating: 5 },
      Bob: { text: "Timeless storytelling.", rating: 5 },
      Carla: { text: "Challenging but rewarding.", rating: 4 },
      David: { text: "Still feels relevant.", rating: 5 },
      Emma: { text: "A foundational classic.", rating: 5 }
    }
  },
  "9780140275360": {
    title: "The Iliad",
    author: "Homer",
    genre: "Epic Poetry",
    reviews: {
      Frank: { text: "Epic battles and gods.", rating: 5 },
      Gina: { text: "A cornerstone of literature.", rating: 5 },
      Helen: { text: "Difficult but amazing.", rating: 4 },
      Ian: { text: "A story of honor and rage.", rating: 5 },
      Jill: { text: "Unforgettable epic poem.", rating: 5 }
    }
  },
  "9780140177398": {
    title: "Of Mice and Men",
    author: "John Steinbeck",
    genre: "Classic",
    reviews: {
      Alice: { text: "Short but impactful.", rating: 5 },
      Bob: { text: "Heartbreaking ending.", rating: 5 },
      Carla: { text: "Steinbeck at his finest.", rating: 5 },
      David: { text: "A tragic masterpiece.", rating: 5 },
      Emma: { text: "Loved it.", rating: 5 }
    }
  },
  "9780142004234": {
    title: "East of Eden",
    author: "John Steinbeck",
    genre: "Classic",
    reviews: {
      Frank: { text: "An American masterpiece.", rating: 5 },
      Gina: { text: "Complex and powerful.", rating: 5 },
      Helen: { text: "Steinbeck’s magnum opus.", rating: 5 },
      Ian: { text: "A deep and moving story.", rating: 5 },
      Jill: { text: "One of my all-time favorites.", rating: 5 }
    }
  },
  "9780684801223": {
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    genre: "Classic",
    reviews: {
      Alice: { text: "Simple but profound.", rating: 5 },
      Bob: { text: "Loved the symbolism.", rating: 5 },
      Carla: { text: "A moving tale of perseverance.", rating: 5 },
      David: { text: "Short but meaningful.", rating: 4 },
      Emma: { text: "Hemingway at his best.", rating: 5 }
    }
  },
  "9781400033416": {
    title: "Beloved",
    author: "Toni Morrison",
    genre: "Literary Fiction",
    reviews: {
      Frank: { text: "Haunting and powerful.", rating: 5 },
      Gina: { text: "A masterpiece of American literature.", rating: 5 },
      Helen: { text: "Deeply moving.", rating: 5 },
      Ian: { text: "Challenging but unforgettable.", rating: 4 },
      Jill: { text: "Heartbreaking and profound.", rating: 5 }
    }
  },
  "9781400033416X": {
    title: "Song of Solomon",
    author: "Toni Morrison",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Rich and layered.", rating: 5 },
      Bob: { text: "Complex and beautiful.", rating: 5 },
      Carla: { text: "Morrison’s writing shines.", rating: 5 },
      David: { text: "Not an easy read, but rewarding.", rating: 4 },
      Emma: { text: "Brilliant novel.", rating: 5 }
    }
  },
  "9781400078776": {
    title: "Never Let Me Go",
    author: "Kazuo Ishiguro",
    genre: "Dystopian",
    reviews: {
      Frank: { text: "Haunting and tragic.", rating: 5 },
      Gina: { text: "Unique and unforgettable.", rating: 5 },
      Helen: { text: "Slow but deeply moving.", rating: 4 },
      Ian: { text: "Ishiguro at his finest.", rating: 5 },
      Jill: { text: "Profound and emotional.", rating: 5 }
    }
  },
  "9780679731726": {
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    genre: "Literary Fiction",
    reviews: {
      Alice: { text: "Subtle and heartbreaking.", rating: 5 },
      Bob: { text: "A quiet masterpiece.", rating: 5 },
      Carla: { text: "Beautifully written.", rating: 5 },
      David: { text: "A slow burn, but powerful.", rating: 4 },
      Emma: { text: "A poignant story.", rating: 5 }
    }
  },
  "9780061122415": {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophical Fiction",
    reviews: {
      Frank: { text: "Simple yet profound.", rating: 5 },
      Gina: { text: "Inspirational and magical.", rating: 5 },
      Helen: { text: "Changed my perspective.", rating: 5 },
      Ian: { text: "A life-changing book.", rating: 5 },
      Jill: { text: "A timeless classic.", rating: 5 }
    }
  },
  "9780060934347": {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    genre: "Classic",
    reviews: {
      Alice: { text: "Funny and tragic.", rating: 5 },
      Bob: { text: "A timeless satire.", rating: 5 },
      Carla: { text: "Long but brilliant.", rating: 4 },
      David: { text: "Loved the characters.", rating: 5 },
      Emma: { text: "One of the greatest ever.", rating: 5 }
    }
  },
  "9780060883287": {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    genre: "Magical Realism",
    reviews: {
      Frank: { text: "Magical and unforgettable.", rating: 5 },
      Gina: { text: "Dense but brilliant.", rating: 5 },
      Helen: { text: "A masterpiece of storytelling.", rating: 5 },
      Ian: { text: "A challenging but rewarding read.", rating: 4 },
      Jill: { text: "Pure literary magic.", rating: 5 }
    }
  },
  "9780307389732": {
    title: "Love in the Time of Cholera",
    author: "Gabriel García Márquez",
    genre: "Magical Realism",
    reviews: {
      Alice: { text: "Romantic and moving.", rating: 5 },
      Bob: { text: "A beautiful love story.", rating: 5 },
      Carla: { text: "Lush and poetic.", rating: 5 },
      David: { text: "Slow at times but worth it.", rating: 4 },
      Emma: { text: "A gorgeous novel.", rating: 5 }
    }
  },
  "9780679720201": {
    title: "The Stranger",
    author: "Albert Camus",
    genre: "Philosophical Fiction",
    reviews: {
      Frank: { text: "Existential and powerful.", rating: 5 },
      Gina: { text: "Camus at his best.", rating: 5 },
      Helen: { text: "Simple yet profound.", rating: 5 },
      Ian: { text: "Short but deep.", rating: 4 },
      Jill: { text: "Unforgettable classic.", rating: 5 }
    }
  }
});
// Export the books object so other files can use it
module.exports = books;

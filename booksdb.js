// In-memory books database: books[isbn] = { title, author, reviews: { [username]: "N| text" } }
const books = {
  "978000000001": {
    title: "The Silent Library",
    author: "Amelia Cross",
    reviews: {
      "alice": "5| Haunting and beautiful.",
      "bob": "4| Great pacing and atmosphere.",
      "carlos": "5| Could not put it down.",
      "dina": "4| Strong mystery with heart.",
      "eli": "3| Good, but slow middle.",
      "fay": "5| Loved the characters.",
      "glen": "4| Smart twists.",
      "hana": "5| Ending was perfect.",
      "ivan": "4| Very satisfying read.",
      "jules": "5| A favorite this year."
    }
  },
  "978000000002": {
    title: "Rivers of Starlight",
    author: "Noah Vale",
    reviews: {
      "kim": "5| Lyrical sci fi with heart.",
      "leo": "4| Big ideas, great cast.",
      "maya": "5| Stunning world building.",
      "nate": "4| Thoughtful and rich.",
      "opal": "3| Dense but rewarding.",
      "pax": "5| Loved every chapter.",
      "quin": "4| Fresh and imaginative.",
      "ria": "5| A beautiful journey.",
      "sara": "4| Very memorable.",
      "taj": "5| Top tier sci fi."
    }
  },
  "978000000003": {
    title: "Clockmaker’s Daughter",
    author: "Ivy Hart",
    reviews: {
      "uma": "5| Gorgeous prose.",
      "vic": "4| Clever structure.",
      "wren": "5| Mystery done right.",
      "xan": "4| Vivid setting.",
      "yara": "3| Slow start, strong end.",
      "zane": "5| Could not stop reading.",
      "amy": "4| Great surprises.",
      "ben": "5| Emotional and sharp.",
      "cara": "4| Elegant writing.",
      "drew": "5| Masterful."
    }
  },
  "978000000004": {
    title: "City of Brass Gears",
    author: "Kieran Pike",
    reviews: {
      "erin": "5| Fun steampunk ride.",
      "fern": "4| Energetic and cool.",
      "greg": "5| Loved the gadgets.",
      "hina": "4| Inventive action.",
      "isa": "3| Light but enjoyable.",
      "jo": "5| Vibes were great.",
      "kai": "4| Slick adventure.",
      "lia": "5| Terrific set pieces.",
      "mos": "4| Great momentum.",
      "nez": "5| I want a sequel."
    }
  },
  "978000000005": {
    title: "The Orchard Keepers",
    author: "Rhea Sloan",
    reviews: {
      "oma": "5| Tender and true.",
      "pam": "4| Subtle and warm.",
      "raj": "5| Wonderful family story.",
      "sam": "4| Poignant themes.",
      "tia": "3| Quiet but moving.",
      "umi": "5| Memorable characters.",
      "vee": "4| Lovely writing.",
      "wes": "5| Heartfelt favorite.",
      "xue": "4| Gentle and kind.",
      "yan": "5| Beautiful ending."
    }
  },
  "978000000006": {
    title: "Neon Harbor Nights",
    author: "Cass Morgan",
    reviews: {
      "ziv": "5| Stylish noir.",
      "aria": "4| Sharp dialogue.",
      "bryn": "5| Electric mood.",
      "cian": "4| Tight plotting.",
      "dax": "3| A bit gritty.",
      "elle": "5| Loved the voice.",
      "finn": "4| Cool setting.",
      "gia": "5| Pulled me in fast.",
      "hal": "4| Great finale.",
      "ian": "5| A standout."
    }
  },
  "978000000007": {
    title: "A Map for Tomorrow",
    author: "Theo Park",
    reviews: {
      "joan": "5| Uplifting and wise.",
      "keir": "4| Thoughtful arc.",
      "luke": "5| Lovely message.",
      "mari": "4| Real and honest.",
      "noor": "3| A little neat.",
      "oria": "5| Joyful read.",
      "peia": "4| Very humane.",
      "rani": "5| I teared up.",
      "sven": "4| Quietly powerful.",
      "tess": "5| Stays with you."
    }
  },
  "978000000008": {
    title: "The Glass Voyager",
    author: "Silas Kade",
    reviews: {
      "ugo": "5| Epic sense of wonder.",
      "vale": "4| Smart ideas.",
      "walt": "5| Loved the scale.",
      "xavi": "4| Fascinating tech.",
      "yuri": "3| Slow in parts.",
      "zora": "5| Awe inspiring.",
      "alec": "4| Cool concepts.",
      "bela": "5| Expansive and bold.",
      "cora": "4| Big imagination.",
      "dion": "5| A favorite."
    }
  },
  "978000000009": {
    title: "Paper Moons",
    author: "June Harlow",
    reviews: {
      "eden": "5| Poetic and tender.",
      "faye": "4| Gentle romance.",
      "gita": "5| Heart on sleeve.",
      "hana": "4| Sweet and real.",
      "irys": "3| Predictable but nice.",
      "juno": "5| Comfort read.",
      "kato": "4| Lovely mood.",
      "lina": "5| Beautiful tone.",
      "mona": "4| Soft and cozy.",
      "niko": "5| Pure delight."
    }
  },
  "978000000010": {
    title: "Black Coral Reef",
    author: "Arden Cho",
    reviews: {
      "olaf": "5| Tense eco thriller.",
      "puri": "4| Strong stakes.",
      "quin": "5| Cinematic scenes.",
      "rhea": "4| Sharp pacing.",
      "sami": "3| Some tropes.",
      "tali": "5| Loved the turns.",
      "urs": "4| Good tension.",
      "vale": "5| Fast and fun.",
      "wren": "4| Great momentum.",
      "xio": "5| Gripping."
    }
  },
  "978000000011": {
    title: "Hidden Constellations",
    author: "Rowan Pitts",
    reviews: {
      "yani": "5| Starry and smart.",
      "zade": "4| Astronomy tie ins.",
      "aver": "5| Big heart.",
      "bari": "4| Inspiring.",
      "cove": "3| A tad long.",
      "dane": "5| Magical feel.",
      "esme": "4| Calm and bright.",
      "faye2": "5| Hug in a book.",
      "gale": "4| Strong finish.",
      "hadi": "5| Loved it."
    }
  },
  "978000000012": {
    title: "Winter’s Cartographer",
    author: "Piper Leigh",
    reviews: {
      "ilan": "5| Atmosphere for days.",
      "joel": "4| Evocative journey.",
      "kira": "5| Stunning landscapes.",
      "lars": "4| Quiet power.",
      "mika": "3| Slow burn.",
      "nuri": "5| Beautiful craft.",
      "olga": "4| Immersive.",
      "penn": "5| Transported me.",
      "quee": "4| Very polished.",
      "ruth": "5| Excellent."
    }
  },
  "978000000013": {
    title: "Signals in the Fog",
    author: "Dorian West",
    reviews: {
      "sio": "5| Eerie and clever.",
      "taz": "4| Cool concept.",
      "umi2": "5| Perfect mood.",
      "vero": "4| Smart clues.",
      "wyn": "3| Needed more clues.",
      "xan2": "5| Nailed the ending.",
      "yue": "4| Nice cadence.",
      "zen": "5| A keeper.",
      "amber": "4| Satisfying.",
      "brad": "5| Great puzzle."
    }
  },
  "978000000014": {
    title: "Embers and Echoes",
    author: "Leah Mor",
    reviews: {
      "cara2": "5| Fiery and bold.",
      "dax2": "4| Strong emotion.",
      "elle2": "5| Big catharsis.",
      "fin2": "4| Compelling arc.",
      "gia2": "3| Heavy at times.",
      "hal2": "5| Powerful end.",
      "ian2": "4| Great beats.",
      "jo2": "5| I felt it.",
      "kai2": "4| Wonderful drive.",
      "lia2": "5| Excellent payoff."
    }
  },
  "978000000015": {
    title: "The Last Green Planet",
    author: "Maya Ren",
    reviews: {
      "max": "5| Hopeful climate tale.",
      "nina": "4| Grounded and clear.",
      "oren": "5| Big heart and scale.",
      "pia": "4| Energizing.",
      "raul": "3| Some slow bits.",
      "sue": "5| Loved the hope.",
      "tan": "4| Engaging story.",
      "umi3": "5| Inspiring.",
      "val": "4| Very relevant.",
      "walt2": "5| Must read."
    }
  }
};

module.exports = books;

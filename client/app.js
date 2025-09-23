// Utilities and global state
const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
const userKey = "brs_user";

let currentUsername = localStorage.getItem(userKey) || null;
let currentIsbn = null;
let currentStars = 0;
let showAll = false;
let allBooksCache = []; // normalized array of { isbn, title, author }

// Auth helpers
function setAuthState({ username, token }) {
  if (username) { currentUsername = username; localStorage.setItem(userKey, username); }
  if (token) localStorage.setItem(tokenKey, token);

  const loggedIn = Boolean(localStorage.getItem(tokenKey));
  $("#nav-login").classList.toggle("hidden", loggedIn);
  $("#nav-register").classList.toggle("hidden", loggedIn);
  $("#nav-logout").classList.toggle("hidden", !loggedIn);
}
function isLoggedIn() { return Boolean(localStorage.getItem(tokenKey)); }
function authHeader() {
  const t = localStorage.getItem(tokenKey);
  return t ? { Authorization: `Bearer ${t}` } : {};
}

// Network
async function fetchJSON(path, opts = {}) {
  const res = await fetch(path, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) }
  });
  if (!res.ok) {
    let msg = res.statusText;
    try { const data = await res.json(); msg = data.message || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}

// Normalizers
function normalizeBooksResponse(payload) {
  // Accept {books: [...]}, or {isbn: {title,author}} object, or array already
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.books)) return payload.books;
  if (payload && typeof payload === "object") {
    // map object to array
    return Object.entries(payload).map(([isbn, obj]) => ({
      isbn,
      title: obj.title,
      author: obj.author
    }));
  }
  return [];
}

// Sections
function show(sectionId) {
  ["hero", "catalog", "auth"].forEach(id => $(`#${id}`).classList.add("hidden"));
  $(`#${sectionId}`).classList.remove("hidden");
}

// Auth tabs
function activateTab(which) {
  const isLogin = which === "login";
  $("#tab-login").classList.toggle("active", isLogin);
  $("#tab-register").classList.toggle("active", !isLogin);
  $("#pane-login").classList.toggle("active", isLogin);
  $("#pane-register").classList.toggle("active", !isLogin);
}

// Catalog
async function loadAllBooks() {
  const payload = await fetchJSON("/books");
  allBooksCache = normalizeBooksResponse(payload);
}

function renderCatalog(list) {
  const grid = $("#grid");
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML = `<p class="msg">No books found.</p>`;
    return;
  }
  for (const b of list) {
    const card = document.createElement("div");
    card.className = "tile";
    card.innerHTML = `
      <h4>${b.title}</h4>
      <p>${b.author}</p>
      <p class="muted">ISBN: ${b.isbn}</p>
      <button class="btn" data-isbn="${b.isbn}">View</button>
    `;
    card.querySelector("button").addEventListener("click", () => openBook(b.isbn));
    grid.appendChild(card);
  }
}

async function loadCatalog(query) {
  if (!allBooksCache.length) await loadAllBooks();
  const q = (query || "").trim().toLowerCase();
  const list = q
    ? allBooksCache.filter(b =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      )
    : allBooksCache.slice();
  renderCatalog(list);
}

// Reviews helpers
function renderStars(container, value) {
  container.querySelectorAll(".star").forEach(btn => {
    const v = Number(btn.dataset.v);
    btn.classList.toggle("active", v <= value);
    btn.setAttribute("aria-checked", String(v === value));
  });
}
function parseRatingFromText(text) {
  // Accept "N| text" or "N - text"
  const m = text.match(/^(\d)\s*[\|\-]\s*(.*)$/);
  if (!m) return { rating: null, text };
  const r = Number(m[1]);
  return { rating: isNaN(r) ? null : r, text: m[2] };
}
function averageRatingFromReviews(reviewsObj) {
  const vals = [];
  for (const [, txt] of Object.entries(reviewsObj || {})) {
    const { rating } = parseRatingFromText(txt);
    if (rating) vals.push(rating);
  }
  if (!vals.length) return null;
  const sum = vals.reduce((a, b) => a + b, 0);
  return Math.round((sum / vals.length) * 10) / 10;
}
function orderedEntriesWithMineFirst(reviewsObj) {
  const arr = Object.entries(reviewsObj || {});
  if (!arr.length) return [];
  if (!currentUsername) return arr;
  const i = arr.findIndex(([u]) => u === currentUsername);
  if (i > -1) {
    const mine = arr.splice(i, 1)[0];
    return [mine, ...arr];
  }
  return arr;
}

// Book modal
async function openBook(isbn) {
  currentIsbn = isbn;
  showAll = false;
  $("#review-msg").textContent = "";
  $("#review-msg").className = "msg";
  $("#my-review").value = "";
  currentStars = 0;
  renderStars($("#my-stars"), currentStars);

  // book details
  let book;
  try {
    book = await fetchJSON(`/isbn/${isbn}`);
  } catch {
    // fall back to cache
    if (!allBooksCache.length) await loadAllBooks();
    book = allBooksCache.find(b => b.isbn === isbn) || { title: "Unknown", author: "Unknown", isbn };
  }
  $("#book-info").innerHTML = `
    <h3 id="book-title">${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${isbn}</p>
  `;

  // reviews
  const rev = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));
  renderReviews(rev.reviews || {});

  // gating
  $("#review-editor").classList.toggle("hidden", !isLoggedIn());
  $("#add-review-btn").classList.toggle("hidden", !isLoggedIn());

  $("#book-modal").classList.remove("hidden");
}

function renderReviews(reviewsObj) {
  const list = $("#reviews-list");
  list.innerHTML = "";

  const ordered = orderedEntriesWithMineFirst(reviewsObj);
  const avg = averageRatingFromReviews(reviewsObj);
  $("#avg-rating").textContent = avg ? `Average rating: ${avg} out of 5` : "Not yet rated";

  const limit = showAll ? Math.min(10, ordered.length) : Math.min(5, ordered.length);
  if (!ordered.length) {
    const li = document.createElement("li");
    li.textContent = "No reviews yet";
    list.appendChild(li);
  } else {
    for (let i = 0; i < limit; i++) {
      const [user, text] = ordered[i];
      const { rating, text: body } = parseRatingFromText(text);
      const li = document.createElement("li");
      li.innerHTML = `
        <div><strong>${user}</strong>${rating ? ` • ${"★".repeat(rating)}` : ""}</div>
        <div>${body}</div>
      `;
      list.appendChild(li);
    }
  }

  const needsMore = ordered.length > limit;
  $("#more-reviews").classList.toggle("hidden", !needsMore);
  $("#more-reviews").textContent = showAll ? "Show fewer" : "More reviews";
}

// Modal controls
function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#review-msg").className = "msg";
  $("#my-review").value = "";
  currentIsbn = null;
  currentStars = 0;
  showAll = false;
  renderStars($("#my-stars"), currentStars);
}

// Event binding
$("#modal-close").addEventListener("click", closeModal);

$("#add-review-btn").addEventListener("click", () => {
  if (!isLoggedIn()) {
    show("auth");
    activateTab("login");
    $("#login-msg").textContent = "Please log in to write a review.";
    return;
  }
  $("#review-editor").classList.remove("hidden");
});

$("#my-stars").addEventListener("click", e => {
  const btn = e.target.closest(".star");
  if (!btn) return;
  currentStars = Number(btn.dataset.v);
  renderStars($("#my-stars"), currentStars);
});

$("#save-review").addEventListener("click", async () => {
  if (!currentIsbn) return;
  const text = $("#my-review").value.trim();
  if (!text) {
    $("#review-msg").textContent = "Please enter a review.";
    $("#review-msg").className = "msg error";
    return;
  }
  const payload = currentStars ? `${currentStars}| ${text}` : text;
  try {
    const out = await fetchJSON(`/customer/auth/review/${currentIsbn}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify({ review: payload })
    });
    $("#review-msg").textContent = out.message || "Saved.";
    $("#review-msg").className = "msg success";
    const fresh = await fetchJSON(`/review/${currentIsbn}`).catch(() => ({ reviews: {} }));
    renderReviews(fresh.reviews || {});
    // clear editor
    $("#my-review").value = "";
    currentStars = 0;
    renderStars($("#my-stars"), currentStars);
  } catch (e) {
    $("#review-msg").textContent = e.message;
    $("#review-msg").className = "msg error";
  }
});

$("#cancel-review").addEventListener("click", () => {
  $("#review-editor").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#review-msg").className = "msg";
  $("#my-review").value = "";
  currentStars = 0;
  renderStars($("#my-stars"), currentStars);
});

$("#more-reviews").addEventListener("click", () => {
  showAll = !showAll;
  // re-fetch to keep ordering correct after changes
  fetchJSON(`/review/${currentIsbn}`)
    .then(data => renderReviews(data.reviews || {}))
    .catch(() => renderReviews({}));
});

// Navigation
$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-login").addEventListener("click", () => { show("auth"); activateTab("login"); });
$("#nav-register").addEventListener("click", () => { show("auth"); activateTab("register"); });
$("#nav-logout").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
  currentUsername = null;
  setAuthState({ username: null });
  closeModal();
  show("hero");
});

$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

// Auth tab toggles
$("#tab-login").addEventListener("click", () => activateTab("login"));
$("#tab-register").addEventListener("click", () => activateTab("register"));
$("#goto-register").addEventListener("click", () => activateTab("register"));

// Auth actions
$("#login-btn").addEventListener("click", async () => {
  const username = $("#login-user").value.trim();
  const password = $("#login-pass").value;
  $("#login-msg").textContent = "";
  try {
    const out = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    setAuthState({ username: out.username, token: out.accessToken });
    $("#login-msg").textContent = "Login successful.";
    $("#login-msg").className = "msg success";
    show("catalog");
    loadCatalog();
  } catch (e) {
    $("#login-msg").textContent = e.message;
    $("#login-msg").className = "msg error";
  }
});

$("#register-btn").addEventListener("click", async () => {
  const username = $("#reg-user").value.trim();
  const password = $("#reg-pass").value;
  $("#register-msg").textContent = "";
  try {
    const out = await fetchJSON("/register", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    $("#register-msg").textContent = out.message || "Registered.";
    $("#register-msg").className = "msg success";
    activateTab("login");
  } catch (e) {
    $("#register-msg").textContent = e.message;
    $("#register-msg").className = "msg error";
  }
});

// Initialize
setAuthState({ username: currentUsername || null });
File path: booksdb.js (repo root)
This is the same fifteen book dataset I gave earlier, included again for convenience. It contains ten reviews per book. Keep it at repo root next to index.js, general.js, and auth_users.js.
// In-memory book database for the Book Review Shop
// books[isbn] = { title, author, reviews: { [username]: "R| review text" } }

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
      "kim": "5| Lyrical sci-fi with heart.",
      "leo": "4| Big ideas, great cast.",
      "maya": "5| Stunning world building.",
      "nate": "4| Thoughtful and rich.",
      "opal": "3| Dense but rewarding.",
      "pax": "5| Loved every chapter.",
      "quin": "4| Fresh and imaginative.",
      "ria": "5| A beautiful journey.",
      "sara": "4| Very memorable.",
      "taj": "5| Top tier sci-fi."
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
      "jo": "5| Vibes were immaculate.",
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
      "zade": "4| Cool astronomy tie ins.",
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
      "oren": "5| Big heart, big scale.",
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
Final checklist
Confirm your server serves the frontend:
In index.js you should have:
const path = require("path");
app.use(express.static(path.join(__dirname, "client")));
Then visiting your Railway domain without a path loads client/index.html.
Confirm middleware import:
middleware/auth.js must exist and export verifyJwt. Your index.js should still include:
const { verifyJwt } = require("./middleware/auth");
app.use("/customer/auth/*", verifyJwt);

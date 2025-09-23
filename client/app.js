const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
const userKey = "brs_user";

let currentUsername = localStorage.getItem(userKey) || null;
let currentIsbn = null;
let currentStars = 0;
let showAll = false;
let allBooksCache = [];

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

// Normalize
function normalizeBooksResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.books)) return payload.books;
  if (payload && typeof payload === "object") {
    return Object.entries(payload).map(([isbn, b]) => ({ isbn, title: b.title, author: b.author }));
  }
  return [];
}

// Sections
function show(sectionId) {
  ["hero", "catalog", "auth"].forEach(id => $(`#${id}`).classList.add("hidden"));
  $(`#${sectionId}`).classList.remove("hidden");
}

// Tabs
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
    ? allBooksCache.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
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

  let book;
  try { book = await fetchJSON(`/isbn/${isbn}`); }
  catch {
    if (!allBooksCache.length) await loadAllBooks();
    book = allBooksCache.find(b => b.isbn === isbn) || { title: "Unknown", author: "Unknown", isbn };
  }
  $("#book-info").innerHTML = `
    <h3 id="book-title">${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${isbn}</p>
  `;

  const rev = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));
  renderReviews(rev.reviews || {});

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

// Bind UI events
$("#modal-close").addEventListener("click", closeModal);

$("#add-review-btn").addEventListener("click", () => {
  if (!isLoggedIn()) {
    show("auth");
    activateTab("login");
    $("#login-msg").textContent = "Please log in to write a review.";
    $("#login-msg").className = "msg";
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

// Tabs
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

// Init
setAuthState({ username: currentUsername || null });

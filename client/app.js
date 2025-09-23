const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUsername = null;
let currentIsbn = null;
let currentStars = 0;
let showingAll = false; // controls 5 vs 10

function setAuthState({ username, token }) {
  currentUsername = username || null;
  if (token) localStorage.setItem(tokenKey, token);
  const loggedIn = Boolean(token || localStorage.getItem(tokenKey));
  $("#nav-login").classList.toggle("hidden", loggedIn);
  $("#nav-register").classList.toggle("hidden", loggedIn);
  $("#nav-logout").classList.toggle("hidden", !loggedIn);
}
function isLoggedIn() { return Boolean(localStorage.getItem(tokenKey)); }
function authHeader() {
  const t = localStorage.getItem(tokenKey);
  return t ? { Authorization: `Bearer ${t}` } : {};
}

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

function show(sectionId) {
  ["hero", "catalog", "auth"].forEach(id => $(`#${id}`).classList.add("hidden"));
  $(`#${sectionId}`).classList.remove("hidden");
}

function activateTab(which) {
  const isLogin = which === "login";
  $("#tab-login")?.classList.toggle("active", isLogin);
  $("#tab-register")?.classList.toggle("active", !isLogin);
  $("#pane-login")?.classList.toggle("active", isLogin);
  $("#pane-register")?.classList.toggle("active", !isLogin);
}

// Catalog
async function loadCatalog(query) {
  const grid = $("#grid");
  grid.innerHTML = "";
  let books = [];
  if (!query) {
    const data = await fetchJSON("/books");
    books = data.books;
  } else {
    const q = query.trim().toLowerCase();
    const byTitle = await fetchJSON(`/title/${encodeURIComponent(q)}`).catch(() => ({ books: [] }));
    const byAuthor = await fetchJSON(`/author/${encodeURIComponent(q)}`).catch(() => ({ books: [] }));
    const merged = new Map();
    [...byTitle.books, ...byAuthor.books].forEach(b => merged.set(b.isbn, b));
    books = [...merged.values()];
  }
  if (books.length === 0) {
    grid.innerHTML = `<p class="msg">No books found.</p>`;
    return;
  }
  for (const b of books) {
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

// Stars helpers
function renderStars(container, value) {
  const buttons = container.querySelectorAll(".star");
  buttons.forEach(btn => {
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
  if (vals.length === 0) return null;
  const sum = vals.reduce((a, b) => a + b, 0);
  return Math.round((sum / vals.length) * 10) / 10;
}

// Build ordered review array with current user first if present
function buildOrderedReviews(reviewsObj) {
  const entries = Object.entries(reviewsObj || {});
  if (!entries.length) return [];
  const mineIdx = entries.findIndex(([user]) => user === currentUsername);
  if (mineIdx > -1) {
    const mine = entries.splice(mineIdx, 1)[0];
    return [mine, ...entries];
  }
  return entries;
}

// Open book modal and render reviews
async function openBook(isbn) {
  currentIsbn = isbn;
  showingAll = false;
  $("#review-msg").textContent = "";
  $("#review-msg").className = "msg";
  $("#my-review").value = "";
  currentStars = 0;
  renderStars($("#my-stars"), currentStars);

  const book = await fetchJSON(`/isbn/${isbn}`);
  const reviews = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));

  $("#book-info").innerHTML = `
    <h3 id="book-title">${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${book.isbn}</p>
  `;

  renderReviewsList(reviews.reviews || {});
  $("#review-editor").classList.toggle("hidden", !isLoggedIn());
  $("#book-modal").classList.remove("hidden");
}

function renderReviewsList(reviewsObj) {
  const list = $("#reviews-list");
  list.innerHTML = "";

  const ordered = buildOrderedReviews(reviewsObj);
  const avg = averageRatingFromReviews(reviewsObj);
  $("#avg-rating").textContent = avg ? `Average rating: ${avg} out of 5` : "Not yet rated";

  if (ordered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No reviews yet";
    list.appendChild(li);
    $("#more-reviews").classList.add("hidden");
    return;
  }

  const limit = showingAll ? Math.min(10, ordered.length) : Math.min(5, ordered.length);
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

  // Toggle visibility of More reviews
  if (ordered.length > limit) {
    $("#more-reviews").classList.remove("hidden");
    $("#more-reviews").textContent = showingAll ? "Show fewer" : "More reviews";
  } else {
    $("#more-reviews").classList.add("hidden");
  }
}

// Add Review entry button
$("#add-review-btn").addEventListener("click", () => {
  if (!isLoggedIn()) {
    show("auth");
    activateTab("login");
    $("#login-msg").textContent = "Please log in to write a review";
    $("#login-msg").className = "msg";
    return;
  }
  $("#review-editor").classList.remove("hidden");
});

// Star rating click
$("#my-stars").addEventListener("click", e => {
  const btn = e.target.closest(".star");
  if (!btn) return;
  currentStars = Number(btn.dataset.v);
  renderStars($("#my-stars"), currentStars);
});

// Submit and cancel
$("#save-review").addEventListener("click", async () => {
  if (!currentIsbn) return;
  const text = $("#my-review").value.trim();
  if (!text) {
    $("#review-msg").textContent = "Please enter a review";
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
    $("#review-msg").textContent = out.message || "Saved";
    $("#review-msg").className = "msg success";
    const fresh = await fetchJSON(`/review/${currentIsbn}`).catch(() => ({ reviews: {} }));
    // Re-render with my review shown first
    renderReviewsList(fresh.reviews || {});
    // Keep editor visible with entered values cleared
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

// Delete review
$("#delete-review").addEventListener("click", async () => {
  if (!currentIsbn) return;
  try {
    const out = await fetchJSON(`/customer/auth/review/${currentIsbn}`, {
      method: "DELETE",
      headers: authHeader()
    });
    $("#review-msg").textContent = out.message || "Deleted";
    $("#review-msg").className = "msg success";
    const fresh = await fetchJSON(`/review/${currentIsbn}`).catch(() => ({ reviews: {} }));
    renderReviewsList(fresh.reviews || {});
    $("#review-editor").classList.add("hidden");
  } catch (e) {
    $("#review-msg").textContent = e.message;
    $("#review-msg").className = "msg error";
  }
});

// More reviews toggle
$("#more-reviews").addEventListener("click", () => {
  showingAll = !showingAll;
  // Re-fetch current reviews to ensure ordering stays correct
  fetchJSON(`/review/${currentIsbn}`)
    .then(data => renderReviewsList(data.reviews || {}))
    .catch(() => renderReviewsList({}));
});

// Modal close
function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#review-msg").className = "msg";
  $("#my-review").value = "";
  currentIsbn = null;
  currentStars = 0;
  showingAll = false;
  renderStars($("#my-stars"), currentStars);
}
$("#modal-close").addEventListener("click", closeModal);

// Nav
$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-login").addEventListener("click", () => { show("auth"); activateTab("login"); });
$("#nav-register").addEventListener("click", () => { show("auth"); activateTab("register"); });

$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

// Auth tabs
$("#tab-login")?.addEventListener("click", () => activateTab("login"));
$("#tab-register")?.addEventListener("click", () => activateTab("register"));
$("#goto-register")?.addEventListener("click", () => activateTab("register"));

// Login
$("#login-btn")?.addEventListener("click", async () => {
  const username = $("#login-user").value.trim();
  const password = $("#login-pass").value;
  $("#login-msg").textContent = "";

  try {
    const out = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    setAuthState({ username: out.username, token: out.accessToken });
    $("#login-msg").textContent = "Login successful";
    $("#login-msg").className = "msg success";
    show("catalog");
    loadCatalog();
  } catch (e) {
    $("#login-msg").textContent = e.message;
    $("#login-msg").className = "msg error";
  }
});

// Register
$("#register-btn")?.addEventListener("click", async () => {
  const username = $("#reg-user").value.trim();
  const password = $("#reg-pass").value;
  $("#register-msg").textContent = "";

  try {
    const out = await fetchJSON("/register", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    $("#register-msg").textContent = out.message || "Registered";
    $("#register-msg").className = "msg success";
    activateTab("login");
  } catch (e) {
    $("#register-msg").textContent = e.message;
    $("#register-msg").className = "msg error";
  }
});

// Logout
$("#nav-logout").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username: null });
  closeModal();
  show("hero");
});

// Init
setAuthState({ username: null });

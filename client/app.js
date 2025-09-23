// ===== Helpers =====
const $ = (sel) => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUser = null;

// Show a top-level page (section)
function showPage(id) {
  ["home", "catalog", "account", "register"].forEach((sec) => {
    const el = document.getElementById(sec);
    if (el) el.classList.toggle("hidden", sec !== id);
  });
  // close modal if switching pages
  closeModal();
}

// Keep header state in sync with auth
function setAuthState({ username = null, token = null } = {}) {
  if (username) currentUser = username;
  if (token) localStorage.setItem(tokenKey, token);
  const loggedIn = Boolean(localStorage.getItem(tokenKey));

  // Toggle Account tab vs Username dropdown
  $("#nav-account").classList.toggle("hidden", loggedIn);
  $("#user-menu").classList.toggle("hidden", !loggedIn);

  if (loggedIn) {
    // If we don't have a username string yet, leave whatever we had
    if (username) $("#user-name").textContent = username;
  } else {
    currentUser = null;
    $("#user-name").textContent = "";
    localStorage.removeItem(tokenKey);
  }
}

function authHeader() {
  const t = localStorage.getItem(tokenKey);
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function fetchJSON(path, opts = {}) {
  const res = await fetch(path, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  const txt = await res.text();
  let data = {};
  try { data = txt ? JSON.parse(txt) : {}; } catch { data = { message: txt }; }
  if (!res.ok) throw new Error(data.message || res.statusText);
  return data;
}

// ===== Catalog =====
async function loadCatalog(query) {
  const grid = $("#grid");
  grid.innerHTML = "";

  let books = [];
  try {
    if (!query) {
      const data = await fetchJSON("/books");
      books = data.books || [];
    } else {
      const q = query.trim().toLowerCase();
      const [byTitle, byAuthor] = await Promise.all([
        fetchJSON(`/title/${encodeURIComponent(q)}`).catch(() => ({ books: [] })),
        fetchJSON(`/author/${encodeURIComponent(q)}`).catch(() => ({ books: [] })),
      ]);
      const merged = new Map();
      [...(byTitle.books || []), ...(byAuthor.books || [])].forEach((b) =>
        merged.set(b.isbn, b)
      );
      books = [...merged.values()];
    }
  } catch (e) {
    console.error(e);
  }

  if (!books.length) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.textContent = "No books found.";
    grid.appendChild(empty);
    return;
  }

  for (const b of books) {
    const card = document.createElement("div");
    card.className = "tile";
    card.innerHTML = `
      <h4>${b.title}</h4>
      <p>${b.author}</p>
      <p class="muted">ISBN: ${b.isbn}</p>
      <button class="btn view-btn" data-isbn="${b.isbn}">View</button>
    `;
    card.querySelector(".view-btn").addEventListener("click", () => openBook(b.isbn));
    grid.appendChild(card);
  }
}

// ===== Book modal / reviews =====
let currentISBN = null;
let starValue = 0;

function renderStars(container, value) {
  container.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const s = document.createElement("span");
    s.className = "star" + (i <= value ? " active" : "");
    s.textContent = "★";
    s.title = `${i} star${i > 1 ? "s" : ""}`;
    s.addEventListener("click", () => {
      starValue = i;
      renderStars(container, starValue);
    });
    container.appendChild(s);
  }
}

async function openBook(isbn) {
  currentISBN = isbn;
  starValue = 0;

  // Load book core details (title/author/isbn)
  let book;
  try {
    book = await fetchJSON(`/isbn/${isbn}`);
  } catch {
    book = { title: `Book ${isbn}`, author: "Unknown", isbn };
  }

  $("#book-info").innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${book.isbn}</p>
  `;

  // Load reviews
  let rev = {};
  try {
    const data = await fetchJSON(`/review/${isbn}`);
    rev = data.reviews || {};
  } catch {
    rev = {};
  }

  // Show only first 5 by default, then reveal "More reviews"
  const entries = Object.entries(rev); // [ [username, "text|rating"], ... ] or plain text
  const list = $("#reviews-list");
  list.innerHTML = "";
  const maxVisible = 5;
  let shown = 0;

  for (const [user, text] of entries.slice(0, maxVisible)) {
    list.appendChild(reviewLI(user, text));
    shown++;
  }

  const moreBtn = $("#more-reviews");
  if (entries.length > shown) {
    moreBtn.classList.remove("hidden");
    moreBtn.onclick = () => {
      for (const [user, text] of entries.slice(shown)) {
        list.appendChild(reviewLI(user, text));
      }
      moreBtn.classList.add("hidden");
    };
  } else {
    moreBtn.classList.add("hidden");
  }

  // Editor visibility
  const loggedIn = Boolean(localStorage.getItem(tokenKey));
  $("#review-editor").classList.toggle("hidden", !loggedIn);

  // Prepare star widget each time
  renderStars($("#star-input"), 0);

  // Wire up editor buttons
  $("#save-review").onclick = onSaveReview;
  $("#delete-review").onclick = onDeleteReview;

  // Add review shortcut (also handles “not logged in”)
  $("#add-review").onclick = () => {
    if (!loggedIn) {
      // Close modal, route to Account > Login
      closeModal();
      showPage("account");
      $("#login-msg").textContent = "Please login to add a review.";
      return;
    }
    // Focus editor
    $("#review-editor").classList.remove("hidden");
    $("#my-review").focus();
  };

  $("#book-modal").classList.remove("hidden");
}

function reviewLI(user, payload) {
  // payload might be "text" or "text|3"
  let text = String(payload);
  let rating = null;
  if (text.includes("|")) {
    const [t, r] = text.split("|");
    text = t;
    rating = Number(r);
  }
  const li = document.createElement("li");
  li.innerHTML = `<strong>${user}</strong>${rating ? ` • ${"★".repeat(rating)}${"☆".repeat(5-rating)}` : ""}<br>${escapeHtml(text)}`;
  return li;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}

async function onSaveReview() {
  if (!currentISBN) return;
  const text = $("#my-review").value.trim();
  if (!text) {
    $("#review-msg").textContent = "Please enter some review text.";
    return;
  }
  const rating = starValue || 0;
  try {
    const out = await fetchJSON(`/customer/auth/review/${currentISBN}`, {
      method: "PUT",
      headers: { ...authHeader() },
      body: JSON.stringify({ review: `${text}|${rating}` }),
    });
    $("#review-msg").textContent = out.message || "Saved!";
    // Refresh the modal view
    openBook(currentISBN);
  } catch (e) {
    $("#review-msg").textContent = e.message;
  }
}

async function onDeleteReview() {
  if (!currentISBN) return;
  try {
    const out = await fetchJSON(`/customer/auth/review/${currentISBN}`, {
      method: "DELETE",
      headers: { ...authHeader() },
    });
    $("#review-msg").textContent = out.message || "Deleted!";
    openBook(currentISBN);
  } catch (e) {
    $("#review-msg").textContent = e.message;
  }
}

function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#my-review").value = "";
  starValue = 0;
}

// ===== Auth: login / register / logout =====
$("#login-btn")?.addEventListener("click", async () => {
  const username = $("#login-username").value.trim();
  const password = $("#login-password").value;
  const msg = $("#login-msg");
  msg.textContent = "";

  if (!username || !password) {
    msg.textContent = "Please enter both username and password.";
    return;
  }

  try {
    const out = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setAuthState({ username: out.username, token: out.accessToken });
    showPage("catalog");
    loadCatalog();
  } catch (e) {
    msg.textContent = e.message;
  }
});

$("#register-btn")?.addEventListener("click", async () => {
  const username = $("#register-username").value.trim();
  const password = $("#register-password").value;
  const msg = $("#register-msg");
  msg.textContent = "";

  if (!username || !password) {
    msg.textContent = "Please enter both username and password.";
    return;
  }

  try {
    const reg = await fetchJSON("/customer/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    // Auto-login
    const login = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setAuthState({ username: login.username, token: login.accessToken });
    showPage("catalog");
    loadCatalog();
  } catch (e) {
    msg.textContent = e.message;
  }
});

$("#logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username: null, token: null });
  showPage("home");
});

// Switch login/register pages
$("#go-register")?.addEventListener("click", () => showPage("register"));
$("#go-login")?.addEventListener("click", () => showPage("account"));

// ===== Nav wiring =====
$("#nav-home").addEventListener("click", () => showPage("home"));
$("#nav-catalog").addEventListener("click", () => {
  showPage("catalog");
  loadCatalog();
});
$("#nav-account").addEventListener("click", () => showPage("account"));
$("#get-started").addEventListener("click", () => {
  showPage("catalog");
  loadCatalog();
});

$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => {
  $("#search-input").value = "";
  loadCatalog();
});

$("#modal-close").addEventListener("click", closeModal);

// ===== Init =====
setAuthState({});
showPage("home"); // default landing

const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUsername = null;
let currentBook = null;
let currentStars = 0;

function setAuthState({ username, token }) {
  currentUsername = username || null;
  if (token) localStorage.setItem(tokenKey, token);
  const loggedIn = Boolean(token || localStorage.getItem(tokenKey));
  $("#nav-login").classList.toggle("hidden", loggedIn);
  $("#nav-register").classList.toggle("hidden", loggedIn);
  $("#nav-logout").classList.toggle("hidden", !loggedIn);
}

function authHeader() {
  const t = localStorage.getItem(tokenKey);
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function fetchJSON(path, opts = {}) {
  const res = await fetch(path, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) }
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || res.statusText);
  return res.json();
}

function show(sectionId) {
  ["hero", "catalog", "auth"].forEach(id => $(`#${id}`).classList.add("hidden"));
  $(`#${sectionId}`).classList.remove("hidden");
}

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

async function openBook(isbn) {
  currentBook = isbn;
  const book = await fetchJSON(`/isbn/${isbn}`);
  const reviews = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));

  $("#book-info").innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${book.isbn}</p>
  `;

  renderReviews(reviews.reviews || {});

  const loggedIn = Boolean(localStorage.getItem(tokenKey));
  $("#add-review-btn").classList.toggle("hidden", !loggedIn);

  $("#book-modal").classList.remove("hidden");
}

function renderReviews(reviews) {
  const list = $("#reviews-list");
  list.innerHTML = "";
  const all = Object.entries(reviews);
  const visible = all.slice(0, 5);
  visible.forEach(([user, text]) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${text}`;
    list.appendChild(li);
  });
  $("#more-reviews").classList.toggle("hidden", all.length <= 5);
  $("#more-reviews").onclick = () => {
    list.innerHTML = "";
    all.forEach(([user, text]) => {
      const li = document.createElement("li");
      li.textContent = `${user}: ${text}`;
      list.appendChild(li);
    });
    $("#more-reviews").classList.add("hidden");
  };
}

function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#my-review").value = "";
  currentStars = 0;
  $("#review-editor").classList.add("hidden");
}

function openReviewEditor() {
  $("#review-editor").classList.remove("hidden");
  buildStars();
}

function buildStars() {
  const container = $("#star-container");
  container.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement("button");
    btn.className = "star" + (i <= currentStars ? " active" : "");
    btn.textContent = "★";
    btn.onclick = () => {
      currentStars = i;
      buildStars();
    };
    container.appendChild(btn);
  }
}

// Event handlers
$("#modal-close").addEventListener("click", closeModal);
$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-login").addEventListener("click", () => { show("auth"); setTab("login-pane"); });
$("#nav-register").addEventListener("click", () => { show("auth"); setTab("register-pane"); });
$("#nav-logout").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username: null });
  closeModal();
  show("hero");
});

$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

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
    $("#login-msg").textContent = "Login successful";
    show("catalog");
    loadCatalog();
  } catch (e) {
    $("#login-msg").textContent = e.message;
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
    $("#register-msg").textContent = out.message;
  } catch (e) {
    $("#register-msg").textContent = e.message;
  }
});

$("#link-register").addEventListener("click", () => setTab("register-pane"));
$("#add-review-btn").addEventListener("click", openReviewEditor);
$("#cancel-review").addEventListener("click", () => { $("#review-editor").classList.add("hidden"); });

$("#save-review").addEventListener("click", async () => {
  const text = $("#my-review").value.trim();
  if (!currentBook || !currentStars || !text) {
    $("#review-msg").textContent = "Please provide stars and text";
    return;
  }
  try {
    const out = await fetchJSON(`/customer/auth/review/${currentBook}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify({ review: `${"★".repeat(currentStars)} ${text}` })
    });
    $("#review-msg").textContent = out.message;
    openBook(currentBook);
  } catch (e) {
    $("#review-msg").textContent = e.message;
  }
});

// Tabs logic
function setTab(tabId) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.query

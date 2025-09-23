const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUsername = null;
let currentIsbn = null;
let currentStars = 0;

// Auth state
function setAuthState({ username, token }) {
  currentUsername = username || null;
  if (token) localStorage.setItem(tokenKey, token);
  const loggedIn = Boolean(token || localStorage.getItem(tokenKey));
  $("#nav-login").classList.toggle("hidden", loggedIn);
  $("#nav-register").classList.toggle("hidden", loggedIn);
  $("#nav-logout").classList.toggle("hidden", !loggedIn);
}

function isLoggedIn() {
  return Boolean(localStorage.getItem(tokenKey));
}

function authHeader() {
  const t = localStorage.getItem(tokenKey);
  return t ? { Authorization: `Bearer ${t}` } : {};
}

// Fetch helper
async function fetchJSON(path, opts = {}) {
  const res = await fetch(path, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) }
  });
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const data = await res.json();
      msg = data.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

// Section switching
function show(sectionId) {
  ["hero", "catalog", "auth"].forEach(id => $(`#${id}`).classList.add("hidden"));
  $(`#${sectionId}`).classList.remove("hidden");
}

// Tabs for auth
function activateTab(which) {
  const loginActive = which === "login";
  $("#tab-login").classList.toggle("active", loginActive);
  $("#tab-register").classList.toggle("active", !loginActive);
  $("#pane-login").classList.toggle("active", loginActive);
  $("#pane-register").classList.toggle("active", !loginActive);
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

// Stars
function renderStars(container, value) {
  const buttons = container.querySelectorAll(".star");
  buttons.forEach(btn => {
    const v = Number(btn.dataset.v);
    btn.classList.toggle("active", v <= value);
    btn.setAttribute("aria-checked", v === value ? "true" : "false");
  });
}

// Compute an average rating from text values if they contain a prefix "x| review text"
function parseRatingFromText(text) {
  // Accept formats like "5| Great book" or "5 - Great book"
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

// Book modal and reviews
async function openBook(isbn) {
  currentIsbn = isbn;
  $("#review-msg").textContent = "";
  $("#review-msg").className = "msg";
  $("#my-review").value = "";
  currentStars = 0;
  renderStars($("#my-stars"), currentStars);

  const book = await fetchJSON(`/isbn/${isbn}`);
  const reviews = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));

  // Book details
  $("#book-info").innerHTML = `
    <h3 id="book-title">${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${book.isbn}</p>
  `;

  // Community reviews list
  const list = $("#reviews-list");
  list.innerHTML = "";
  const rObj = reviews.reviews || {};
  const avg = averageRatingFromReviews(rObj);
  $("#avg-rating").textContent = avg ? `Average rating: ${avg} out of 5` : "Not yet rated";

  const entries = Object.entries(rObj);
  if (entries.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No reviews yet";
    list.appendChild(li);
  } else {
    entries.forEach(([user, text]) => {
      const { rating, text: body } = parseRatingFromText(text);
      const li = document.createElement("li");
      li.innerHTML = `
        <div><strong>${user}</strong>${rating ? ` • ${"★".repeat(rating)}` : ""}</div>
        <div>${body}</div>
      `;
      list.appendChild(li);
    });
  }

  // Editor visibility
  const hasToken = isLoggedIn();
  $("#review-editor").classList.toggle("hidden", !hasToken);

  $("#book-modal").classList.remove("hidden");
}

// Add Review button behavior
$("#add-review-btn").addEventListener("click", () => {
  if (!isLoggedIn()) {
    // Route to login pane and show hint
    show("auth");
    activateTab("login");
    $("#login-msg").textContent = "Please log in to write a review";
    $("#login-msg").className = "msg";
    return;
  }
  // If logged in, open editor inside the modal
  $("#review-editor").classList.remove("hidden");
  // Keep the modal open
  if (currentIsbn) {
    // no-op, already open
  }
});

// Save review
$("#save-review").onclick = async () => {
  if (!currentIsbn) return;
  const text = $("#my-review").value.trim();
  if (!text) {
    $("#review-msg").textContent = "Please enter a review";
    $("#review-msg").className = "msg error";
    return;
  }
  // Prefix rating to text so older backend can still store it
  const payload = currentStars ? `${currentStars}| ${text}` : text;

  try {
    const out = await fetchJSON(`/customer/auth/review/${currentIsbn}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify({ review: payload })
    });
    $("#review-msg").textContent = out.message || "Saved";
    $("#review-msg").className = "msg success";
    // Refresh the modal details
    openBook(currentIsbn);
  } catch (e) {
    $("#review-msg").textContent = e.message;
    $("#review-msg").className = "msg error";
  }
};

// Delete review
$("#delete-review").onclick = async () => {
  if (!currentIsbn) return;
  try {
    const out = await fetchJSON(`/customer/auth/review/${currentIsbn}`, {
      method: "DELETE",
      headers: authHeader()
    });
    $("#review-msg").textContent = out.message || "Deleted";
    $("#review-msg").className = "msg success";
    openBook(currentIsbn);
  } catch (e) {
    $("#review-msg").textContent = e.message;
    $("#review-msg").className = "msg error";
  }
};

// Modal close
function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#review-msg").className = "msg";
  $("#my-review").value = "";
  currentIsbn = null;
  currentStars = 0;
}
$("#modal-close").addEventListener("click", closeModal);

// Star rating interactions
$("#my-stars").addEventListener("click", e => {
  const btn = e.target.closest(".star");
  if (!btn) return;
  currentStars = Number(btn.dataset.v);
  renderStars($("#my-stars"), currentStars);
});

// Navigation
$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-login").addEventListener("click", () => { show("auth"); activateTab("login"); });
$("#nav-register").addEventListener("click", () => { show("auth"); activateTab("register"); });

$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

// Auth
$("#tab-login").addEventListener("click", () => activateTab("login"));
$("#tab-register").addEventListener("click", () => activateTab("register"));
$("#goto-register").addEventListener("click", () => activateTab("register"));

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
    $("#register-msg").textContent = out.message || "Registered";
    $("#register-msg").className = "msg success";
    // After successful registration, move to login tab
    activateTab("login");
  } catch (e) {
    $("#register-msg").textContent = e.message;
    $("#register-msg").className = "msg error";
  }
});

$("#nav-logout").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username: null });
  closeModal();
  show("hero");
});

// Init
setAuthState({ username: null });

const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUsername = null;

// Auth state
function setAuthState({ username, token }) {
  currentUsername = username || null;
  if (token) localStorage.setItem(tokenKey, token);
  const loggedIn = Boolean(token || localStorage.getItem(tokenKey));

  $("#nav-account").classList.toggle("hidden", loggedIn);
  $("#user-dropdown").classList.toggle("hidden", !loggedIn);
  if (loggedIn && username) {
    $("#username-display").textContent = username;
  }
}

// Headers with auth
function authHeader() {
  const t = localStorage.getItem(tokenKey);
  return t ? { Authorization: `Bearer ${t}` } : {};
}

// Fetch wrapper
async function fetchJSON(path, opts = {}) {
  const res = await fetch(path, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) }
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || res.statusText);
  return res.json();
}

// Navigation
function showPage(id) {
  ["hero", "catalog", "account", "register"].forEach(p => $(`#${p}`).classList.add("hidden"));
  $(`#${id}`).classList.remove("hidden");
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

// Book modal
async function openBook(isbn) {
  const book = await fetchJSON(`/isbn/${isbn}`);
  const reviews = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));

  $("#book-info").innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${book.isbn}</p>
  `;

  const list = $("#reviews-list");
  list.innerHTML = "";
  const allReviews = Object.entries(reviews.reviews || {});
  const firstFive = allReviews.slice(0, 5);
  firstFive.forEach(([user, r]) => {
    const li = document.createElement("li");
    li.textContent = `${user} (${r.stars}★): ${r.text}`;
    list.appendChild(li);
  });
  $("#more-reviews").classList.toggle("hidden", allReviews.length <= 5);
  $("#more-reviews").onclick = () => {
    list.innerHTML = "";
    allReviews.forEach(([user, r]) => {
      const li = document.createElement("li");
      li.textContent = `${user} (${r.stars}★): ${r.text}`;
      list.appendChild(li);
    });
    $("#more-reviews").classList.add("hidden");
  };

  $("#review-editor").classList.add("hidden");
  $("#add-review").onclick = () => {
    if (!localStorage.getItem(tokenKey)) {
      closeModal();
      showPage("account");
      return;
    }
    $("#review-editor").classList.remove("hidden");
  };

  $("#save-review").onclick = async () => {
    const text = $("#my-review").value.trim();
    const stars = $("#review-stars").value;
    try {
      const out = await fetchJSON(`/customer/auth/review/${isbn}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ review: { stars, text } })
      });
      $("#review-msg").textContent = out.message;
      openBook(isbn);
    } catch (e) {
      $("#review-msg").textContent = e.message;
    }
  };

  $("#cancel-review").onclick = closeModal;

  $("#book-modal").classList.remove("hidden");
}

function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#my-review").value = "";
}

// Event bindings
$("#modal-close").addEventListener("click", closeModal);
$("#get-started").addEventListener("click", () => { showPage("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => showPage("hero"));
$("#nav-catalog").addEventListener("click", () => { showPage("catalog"); loadCatalog(); });
$("#nav-account").addEventListener("click", () => { showPage("account"); });
$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

// Login
$("#login-btn").addEventListener("click", async () => {
  const username = $("#login-username").value.trim();
  const password = $("#login-password").value;
  $("#login-msg").textContent = "";
  try {
    const out = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    setAuthState({ username: out.username, token: out.accessToken });
    showPage("catalog");
  } catch (e) {
    $("#login-msg").textContent = e.message;
  }
});

// Register
$("#register-btn").addEventListener("click", async () => {
  const username = $("#register-username").value.trim();
  const password = $("#register-password").value.trim();
  const msg = $("#register-msg");
  msg.textContent = "";
  if (!username || !password) {
    msg.textContent = "Please enter both fields.";
    return;
  }
  try {
    const res = await fetch("/customer/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) {
      msg.textContent = data.message || "Registration failed.";
      return;
    }
    // Auto-login
    const loginRes = await fetch("/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const loginData = await loginRes.json();
    if (loginRes.ok) {
      setAuthState({ username: loginData.username, token: loginData.accessToken });
      showPage("catalog");
    }
  } catch (err) {
    msg.textContent = "Error registering user.";
  }
});

// Switch login/register
$("#go-register").addEventListener("click", () => showPage("register"));
$("#go-login").addEventListener("click", () => showPage("account"));

// Logout
$("#logout-btn").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username: null });
  showPage("hero");
});

// Init
setAuthState({ username: null });

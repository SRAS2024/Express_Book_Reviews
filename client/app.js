const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUsername = null;

function setAuthState({ username, token }) {
  currentUsername = username || null;
  if (token) localStorage.setItem(tokenKey, token);
  const loggedIn = Boolean(token || localStorage.getItem(tokenKey));

  $("#nav-account").classList.toggle("hidden", loggedIn);
  $("#user-menu").classList.toggle("hidden", !loggedIn);
  if (loggedIn && currentUsername) {
    $("#user-name").textContent = currentUsername;
  }
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
  ["hero", "catalog", "login", "register"].forEach(id => $(`#${id}`).classList.add("hidden"));
  $(`#${sectionId}`).classList.remove("hidden");
}

async function loadCatalog(query) {
  const grid = $("#grid");
  grid.innerHTML = "";
  let books = [];
  const data = !query ? await fetchJSON("/books") : await searchBooks(query);
  books = data.books || [];

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

async function searchBooks(query) {
  const q = query.trim().toLowerCase();
  const byTitle = await fetchJSON(`/title/${encodeURIComponent(q)}`).catch(() => ({ books: [] }));
  const byAuthor = await fetchJSON(`/author/${encodeURIComponent(q)}`).catch(() => ({ books: [] }));
  const merged = new Map();
  [...byTitle.books, ...byAuthor.books].forEach(b => merged.set(b.isbn, b));
  return { books: [...merged.values()] };
}

async function openBook(isbn) {
  const book = await fetchJSON(`/isbn/${isbn}`);
  const reviews = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));
  $("#book-info").innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${book.isbn}</p>
    <button id="add-review-btn" class="btn-primary">Add Review</button>
  `;

  const list = $("#reviews-list");
  list.innerHTML = "";
  const entries = Object.entries(reviews.reviews || {});
  entries.slice(0, 5).forEach(([user, text]) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${text}`;
    list.appendChild(li);
  });

  $("#more-reviews").classList.toggle("hidden", entries.length <= 5);
  $("#more-reviews").onclick = () => {
    list.innerHTML = "";
    entries.forEach(([user, text]) => {
      const li = document.createElement("li");
      li.textContent = `${user}: ${text}`;
      list.appendChild(li);
    });
    $("#more-reviews").classList.add("hidden");
  };

  $("#add-review-btn").onclick = () => {
    if (!localStorage.getItem(tokenKey)) {
      closeModal();
      show("login");
    } else {
      $("#review-editor").classList.remove("hidden");
    }
  };

  $("#save-review").onclick = async () => {
    const text = $("#my-review").value.trim();
    const stars = $("#review-stars").value;
    try {
      const out = await fetchJSON(`/customer/auth/review/${isbn}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ review: `${"★".repeat(stars)} ${text}` })
      });
      $("#review-msg").textContent = out.message;
      openBook(isbn);
    } catch (e) {
      $("#review-msg").textContent = e.message;
    }
  };

  $("#delete-review").onclick = async () => {
    try {
      const out = await fetchJSON(`/customer/auth/review/${isbn}`, {
        method: "DELETE",
        headers: authHeader()
      });
      $("#review-msg").textContent = out.message;
      openBook(isbn);
    } catch (e) {
      $("#review-msg").textContent = e.message;
    }
  };

  $("#book-modal").classList.remove("hidden");
}

function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#my-review").value = "";
  $("#review-editor").classList.add("hidden");
}

$("#modal-close").addEventListener("click", closeModal);
$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-account").addEventListener("click", () => { show("login"); });

$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

$("#login-btn").addEventListener("click", async () => {
  const username = $("#login-user").value.trim();
  const password = $("#login-pass").value;
  try {
    const out = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    setAuthState({ username: out.username, token: out.accessToken });
    show("catalog");
    loadCatalog();
  } catch (e) {
    $("#login-msg").textContent = e.message;
  }
});

$("#link-register").addEventListener("click", () => { show("register"); });

$("#register-btn").addEventListener("click", async () => {
  const username = $("#reg-user").value.trim();
  const password = $("#reg-pass").value;
  try {
    const out = await fetchJSON("/customer/register", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    setAuthState({ username, token: out.accessToken });
    show("catalog");
    loadCatalog();
  } catch (e) {
    $("#register-msg").textContent = e.message;
  }
});

$("#logout-btn").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username: null });
  show("hero");
});

// Initial state
setAuthState({ username: null });

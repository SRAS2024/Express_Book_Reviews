// Utility selector
const $ = sel => document.querySelector(sel);

// Token storage
const tokenKey = "brs_token";
let currentUsername = null;

// ----------------------------
// Auth Helpers
// ----------------------------
function setAuthState({ username, token }) {
  currentUsername = username || null;

  if (token) {
    localStorage.setItem(tokenKey, token);
  }

  const loggedIn = Boolean(token || localStorage.getItem(tokenKey));

  $("#nav-login").classList.toggle("hidden", loggedIn);
  $("#nav-register").classList.toggle("hidden", loggedIn);
  $("#nav-logout").classList.toggle("hidden", !loggedIn);
}

function authHeader() {
  const t = localStorage.getItem(tokenKey);
  return t ? { Authorization: `Bearer ${t}` } : {};
}

// Generic fetch wrapper
async function fetchJSON(path, opts = {}) {
  const res = await fetch(path, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {})
    }
  });

  if (!res.ok) {
    let errMsg = res.statusText;
    try {
      const errData = await res.json();
      errMsg = errData.message || errMsg;
    } catch (_) {}
    throw new Error(errMsg);
  }
  return res.json();
}

// ----------------------------
// Navigation & Sections
// ----------------------------
function show(sectionId) {
  ["hero", "catalog", "auth"].forEach(id =>
    $(`#${id}`).classList.add("hidden")
  );
  $(`#${sectionId}`).classList.remove("hidden");
}

// ----------------------------
// Catalog
// ----------------------------
async function loadCatalog(query) {
  const grid = $("#grid");
  grid.innerHTML = "";

  let books = [];
  if (!query) {
    const data = await fetchJSON("/books");
    books = data.books;
  } else {
    const q = query.trim().toLowerCase();
    const byTitle = await fetchJSON(`/title/${encodeURIComponent(q)}`).catch(
      () => ({ books: [] })
    );
    const byAuthor = await fetchJSON(`/author/${encodeURIComponent(q)}`).catch(
      () => ({ books: [] })
    );

    const merged = new Map();
    [...byTitle.books, ...byAuthor.books].forEach(b =>
      merged.set(b.isbn, b)
    );
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
    card
      .querySelector("button")
      .addEventListener("click", () => openBook(b.isbn));
    grid.appendChild(card);
  }
}

// ----------------------------
// Book Modal & Reviews
// ----------------------------
async function openBook(isbn) {
  const book = await fetchJSON(`/isbn/${isbn}`);
  const reviews = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));

  // Book details
  $("#book-info").innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${book.isbn}</p>
  `;

  // Reviews
  const list = $("#reviews-list");
  list.innerHTML = "";
  Object.entries(reviews.reviews || {}).forEach(([user, text]) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${text}`;
    list.appendChild(li);
  });

  // Review editor (only for logged in)
  const hasToken = Boolean(localStorage.getItem(tokenKey));
  $("#review-editor").classList.toggle("hidden", !hasToken);

  $("#save-review").onclick = async () => {
    const text = $("#my-review").value.trim();
    try {
      const out = await fetchJSON(`/customer/auth/review/${isbn}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ review: text })
      });
      $("#review-msg").textContent = out.message;
      $("#review-msg").className = "msg success";
      openBook(isbn);
    } catch (e) {
      $("#review-msg").textContent = e.message;
      $("#review-msg").className = "msg error";
    }
  };

  $("#delete-review").onclick = async () => {
    try {
      const out = await fetchJSON(`/customer/auth/review/${isbn}`, {
        method: "DELETE",
        headers: authHeader()
      });
      $("#review-msg").textContent = out.message;
      $("#review-msg").className = "msg success";
      openBook(isbn);
    } catch (e) {
      $("#review-msg").textContent = e.message;
      $("#review-msg").className = "msg error";
    }
  };

  $("#book-modal").classList.remove("hidden");
}

function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#review-msg").className = "msg";
  $("#my-review").value = "";
}

// ----------------------------
// Auth Actions
// ----------------------------
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
    $("#register-msg").textContent = out.message;
    $("#register-msg").className = "msg success";
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

// ----------------------------
// Navigation Event Listeners
// ----------------------------
$("#modal-close").addEventListener("click", closeModal);
$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-login").addEventListener("click", () => show("auth"));
$("#nav-register").addEventListener("click", () => show("auth"));
$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

// ----------------------------
// Initialize
// ----------------------------
setAuthState({ username: null });

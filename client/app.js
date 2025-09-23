const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUsername = null;

// ---------------- AUTH STATE ----------------
function setAuthState({ username, token }) {
  currentUsername = username || null;
  if (token) localStorage.setItem(tokenKey, token);

  const loggedIn = Boolean(token || localStorage.getItem(tokenKey));

  // Toggle account dropdown vs account button
  $("#nav-account").classList.toggle("hidden", loggedIn);
  $("#user-dropdown").classList.toggle("hidden", !loggedIn);

  if (loggedIn && currentUsername) {
    $("#user-btn").textContent = currentUsername;
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

// ---------------- NAVIGATION ----------------
function show(sectionId) {
  ["hero", "catalog", "account"].forEach(id => $(`#${id}`).classList.add("hidden"));
  $(`#${sectionId}`).classList.remove("hidden");
}

// ---------------- CATALOG ----------------
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

// ---------------- BOOK DETAILS ----------------
let visibleReviews = 5;

async function openBook(isbn) {
  const book = await fetchJSON(`/isbn/${isbn}`);
  const reviews = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));

  $("#book-info").innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${book.isbn}</p>
  `;

  renderReviews(reviews.reviews || {}, true);

  // Add review button logic
  $("#add-review-btn").onclick = () => {
    if (!localStorage.getItem(tokenKey)) {
      closeModal(); // close modal first
      show("account");
      $("#login-msg").textContent = "Please log in to add a review.";
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
        body: JSON.stringify({ review: `${"★".repeat(stars)} ${text}` })
      });
      $("#review-msg").textContent = out.message;
      openBook(isbn); // reload
    } catch (e) {
      $("#review-msg").textContent = e.message;
    }
  };

  $("#cancel-review").onclick = () => {
    $("#review-editor").classList.add("hidden");
    $("#my-review").value = "";
  };

  $("#book-modal").classList.remove("hidden");
}

function renderReviews(reviews, reset = false) {
  const list = $("#reviews-list");
  if (reset) visibleReviews = 5;
  list.innerHTML = "";

  const entries = Object.entries(reviews || {});
  entries.slice(0, visibleReviews).forEach(([user, text]) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${text}`;
    list.appendChild(li);
  });

  const moreBtn = $("#more-reviews");
  if (entries.length > visibleReviews) {
    moreBtn.classList.remove("hidden");
    moreBtn.onclick = () => {
      visibleReviews += 5;
      renderReviews(reviews);
    };
  } else {
    moreBtn.classList.add("hidden");
  }
}

function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#my-review").value = "";
  $("#review-editor").classList.add("hidden");
}

// ---------------- ACCOUNT ----------------
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
    show("catalog");
  } catch (e) {
    $("#login-msg").textContent = e.message;
  }
});

$("#register-btn").addEventListener("click", async () => {
  const username = $("#reg-user").value.trim();
  const password = $("#reg-pass").value;
  $("#register-msg").textContent = "";
  try {
    const out = await fetchJSON("/customer/register", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    $("#register-msg").textContent = out.message;
    // auto login
    const loginOut = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    setAuthState({ username: loginOut.username, token: loginOut.accessToken });
    show("catalog");
  } catch (e) {
    $("#register-msg").textContent = e.message;
  }
});

$("#logout-btn").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username: null });
  show("hero");
});

// Toggle between login/register forms
$("#show-register").addEventListener("click", () => {
  $("#login-form").classList.add("hidden");
  $("#register-form").classList.remove("hidden");
});
$("#show-login").addEventListener("click", () => {
  $("#register-form").classList.add("hidden");
  $("#login-form").classList.remove("hidden");
});

// ---------------- NAV BUTTONS ----------------
$("#modal-close").addEventListener("click", closeModal);
$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-account").addEventListener("click", () => show("account"));
$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

// ---------------- INIT ----------------
setAuthState({ username: null });

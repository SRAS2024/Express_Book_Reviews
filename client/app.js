const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUsername = null;

function setAuthState({ username, token }) {
  currentUsername = username || null;
  if (token) localStorage.setItem(tokenKey, token);
  const loggedIn = Boolean(token || localStorage.getItem(tokenKey));

  if (loggedIn) {
    $("#auth-section").classList.add("hidden");
    $("#loggedin-section").classList.remove("hidden");
    $("#welcome-msg").textContent = `Welcome, ${username || currentUsername}`;
  } else {
    $("#auth-section").classList.remove("hidden");
    $("#loggedin-section").classList.add("hidden");
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
  ["hero", "catalog"].forEach(id => $(`#${id}`).classList.add("hidden"));
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
  const book = await fetchJSON(`/isbn/${isbn}`);
  const reviews = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));

  $("#book-info").innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${book.isbn}</p>
  `;

  renderReviews(reviews.reviews || {});

  $("#add-review-btn").onclick = () => {
    const hasToken = Boolean(localStorage.getItem(tokenKey));
    if (!hasToken) {
      $("#login-msg").textContent = "Please log in to add a review.";
      $("#account-dropdown").classList.remove("hidden");
      return;
    }
    $("#review-editor").classList.remove("hidden");
  };

  $("#submit-review").onclick = async () => {
    const text = $("#my-review").value.trim();
    const stars = $("#star-rating").value;
    if (!text) {
      $("#review-msg").textContent = "Review cannot be empty.";
      return;
    }

    try {
      const out = await fetchJSON(`/customer/auth/review/${isbn}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ review: `${"★".repeat(stars)}${"☆".repeat(5 - stars)} - ${text}` })
      });
      $("#review-msg").textContent = out.message;
      $("#review-editor").classList.add("hidden");
      $("#my-review").value = "";
      renderReviews(out.reviews);
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

function renderReviews(reviews) {
  const list = $("#reviews-list");
  list.innerHTML = "";
  const entries = Object.entries(reviews || {});
  const firstFive = entries.slice(0, 5);

  firstFive.forEach(([user, text]) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${text}`;
    list.appendChild(li);
  });

  const moreBtn = $("#more-reviews");
  if (entries.length > 5) {
    moreBtn.classList.remove("hidden");
    moreBtn.onclick = () => {
      list.innerHTML = "";
      entries.forEach(([user, text]) => {
        const li = document.createElement("li");
        li.textContent = `${user}: ${text}`;
        list.appendChild(li);
      });
      moreBtn.classList.add("hidden");
    };
  } else {
    moreBtn.classList.add("hidden");
  }
}

function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#my-review").value = "";
}

// Event bindings
$("#modal-close").addEventListener("click", closeModal);
$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });

$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

// Auth
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

$("#nav-logout").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username: null });
  closeModal();
  show("hero");
});

// Account dropdown toggle
$("#nav-account").addEventListener("click", () => {
  $("#account-dropdown").classList.toggle("hidden");
});

// Initial state
setAuthState({ username: null });

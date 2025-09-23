const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUsername = null;

function setAuthState({ username, token }) {
  if (typeof token === "string") localStorage.setItem(tokenKey, token);
  currentUsername = username || currentUsername || null;

  const loggedIn = Boolean(localStorage.getItem(tokenKey));
  if (loggedIn && currentUsername) {
    $("#signed-out").classList.add("hidden");
    $("#signed-in").classList.remove("hidden");
    $("#welcome-msg").textContent = `Signed in as ${currentUsername}`;
    $("#account-label").textContent = currentUsername;
  } else {
    $("#signed-out").classList.remove("hidden");
    $("#signed-in").classList.add("hidden");
    $("#account-label").textContent = "Account";
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
  if (!res.ok) {
    let msg = res.statusText;
    try { const j = await res.json(); if (j && j.message) msg = j.message; } catch {}
    throw new Error(msg);
  }
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
  try {
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
  } catch (e) {
    console.error(e);
    grid.innerHTML = `<div class="card">Failed to load catalog: ${e.message}</div>`;
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

async function openBook(isbn) {
  let book, reviews;
  try {
    book = await fetchJSON(`/isbn/${isbn}`);
    reviews = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));
  } catch (e) {
    alert(`Failed to load book: ${e.message}`);
    return;
  }

  $("#book-info").innerHTML = `
    <h3 id="book-title">${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${book.isbn}</p>
  `;
  renderReviews(reviews.reviews || {});

  // Add Review flow
  $("#review-editor").classList.add("hidden");
  $("#add-review-btn").onclick = () => {
    const hasToken = Boolean(localStorage.getItem(tokenKey));
    if (!hasToken) {
      // open account modal on login prompt
      $("#login-msg").textContent = "Please log in to add a review.";
      openAccountModal();
      return;
    }
    $("#review-editor").classList.remove("hidden");
    $("#my-review").focus();
  };

  $("#submit-review").onclick = async () => {
    const text = $("#my-review").value.trim();
    const stars = parseInt($("#star-rating").value, 10);
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
    $("#review-msg").textContent = "";
  };

  // Open modal
  openBookModal();
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

/* Modal helpers */
function openBookModal() {
  const m = $("#book-modal");
  m.classList.remove("hidden");
  m.setAttribute("aria-hidden", "false");
}
function closeBookModal() {
  const m = $("#book-modal");
  m.classList.add("hidden");
  m.setAttribute("aria-hidden", "true");
  $("#review-msg").textContent = "";
  $("#my-review").value = "";
}

function openAccountModal() {
  const m = $("#account-modal");
  m.classList.remove("hidden");
  m.setAttribute("aria-hidden", "false");
}
function closeAccountModal() {
  const m = $("#account-modal");
  m.classList.add("hidden");
  m.setAttribute("aria-hidden", "true");
  $("#login-msg").textContent = "";
  $("#register-msg").textContent = "";
}

/* Event bindings */
$("#modal-close").addEventListener("click", closeBookModal);
$("#account-close").addEventListener("click", closeAccountModal);

$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-account").addEventListener("click", openAccountModal);

$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

/* Auth actions */
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
    // keep modal open to show state change
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

$("#logout-btn").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  currentUsername = null;
  setAuthState({ username: null });
  closeBookModal();
  closeAccountModal();
  show("hero");
});

/* Init */
setAuthState({ username: null });
show("hero");
loadCatalog();

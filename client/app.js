const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUsername = null;
let visibleReviews = 5;

// --------------- Helpers ---------------
function setAuthState({ username, token }) {
  currentUsername = username || null;
  if (token) localStorage.setItem(tokenKey, token);

  const loggedIn = Boolean(token || localStorage.getItem(tokenKey));

  $("#nav-account").classList.toggle("hidden", loggedIn);
  $("#user-dropdown").classList.toggle("hidden", !loggedIn);

  if (loggedIn && currentUsername) $("#user-btn").textContent = currentUsername;
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
    try { msg = (await res.json()).message || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}

function show(sectionId) {
  ["hero","catalog","account"].forEach(id => $(`#${id}`).classList.add("hidden"));
  $(`#${sectionId}`).classList.remove("hidden");
}

// --------------- Catalog ---------------
function normalizeBooksPayload(payload) {
  // Accepts: {books:[...]} OR {books:{isbn:{...}}} OR {isbn:{...}} object
  const src = payload?.books ?? payload;
  if (Array.isArray(src)) return src;
  if (src && typeof src === "object") {
    return Object.entries(src).map(([isbn, info]) => ({ isbn, ...info }));
  }
  return [];
}

async function loadCatalog(query) {
  const grid = $("#grid");
  grid.innerHTML = "";
  let books = [];

  if (!query) {
    books = normalizeBooksPayload(await fetchJSON("/books"));
  } else {
    const q = encodeURIComponent(query.trim());
    const byT = normalizeBooksPayload(await fetchJSON(`/title/${q}`).catch(() => ({})));
    const byA = normalizeBooksPayload(await fetchJSON(`/author/${q}`).catch(() => ({})));
    const merged = new Map();
    [...byT, ...byA].forEach(b => merged.set(b.isbn, b));
    books = [...merged.values()];
  }

  if (!books.length) {
    grid.innerHTML = `<div class="card">No books found.</div>`;
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

// --------------- Book Details ---------------
function closeModal() {
  $("#book-modal").classList.add("hidden");
  $("#review-editor").classList.add("hidden");
  $("#review-msg").textContent = "";
  $("#my-review").value = "";
  visibleReviews = 5;
}

async function openBook(isbn) {
  // support both direct object or wrapped
  const bookRaw = await fetchJSON(`/isbn/${isbn}`);
  const book = bookRaw?.book ?? bookRaw;
  const revRaw = await fetchJSON(`/review/${isbn}`).catch(() => ({}));
  const reviews = revRaw?.reviews ?? revRaw ?? {};

  $("#book-info").innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>ISBN: ${isbn}</p>
  `;

  // Add Review button
  $("#add-review-btn").onclick = () => {
    if (!localStorage.getItem(tokenKey)) {
      closeModal();            // close the modal
      show("account");         // route to account
      $("#login-msg").textContent = "Please log in to add a review.";
      return;
    }
    $("#review-editor").classList.remove("hidden");
  };

  // Save / Cancel / Delete handlers
  $("#save-review").onclick = async () => {
    const text = $("#my-review").value.trim();
    const stars = $("#review-stars").value;
    if (!text) { $("#review-msg").textContent = "Please write a review."; return; }
    try {
      const out = await fetchJSON(`/customer/auth/review/${isbn}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ review: `${"★".repeat(stars)} ${text}` })
      });
      $("#review-msg").textContent = out.message || "Saved!";
      await openBook(isbn); // reload
    } catch (e) {
      $("#review-msg").textContent = e.message;
    }
  };

  $("#cancel-review").onclick = () => {
    $("#review-editor").classList.add("hidden");
    $("#my-review").value = "";
  };

  $("#delete-review").onclick = async () => {
    try {
      const out = await fetchJSON(`/customer/auth/review/${isbn}`, {
        method: "DELETE",
        headers: authHeader()
      });
      $("#review-msg").textContent = out.message || "Deleted.";
      await openBook(isbn);
    } catch (e) {
      $("#review-msg").textContent = e.message;
    }
  };

  // Render reviews + "More reviews"
  renderReviews(reviews, true);

  $("#book-modal").classList.remove("hidden");
}

function renderReviews(reviewsObj, reset=false) {
  const list = $("#reviews-list");
  const moreBtn = $("#more-reviews");
  if (reset) visibleReviews = 5;

  const entries = Object.entries(reviewsObj || {});
  list.innerHTML = "";

  entries.slice(0, visibleReviews).forEach(([user, text]) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${text}`;
    list.appendChild(li);
  });

  if (entries.length > visibleReviews) {
    moreBtn.classList.remove("hidden");
    moreBtn.onclick = () => {
      visibleReviews += 5;
      renderReviews(reviewsObj);
    };
  } else {
    moreBtn.classList.add("hidden");
  }
}

// --------------- Account (Login / Register) ---------------
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
    // try /customer/register first, fallback to /register if backend uses that
    try {
      await fetchJSON("/customer/register", { method:"POST", body: JSON.stringify({ username, password }) });
    } catch {
      await fetchJSON("/register", { method:"POST", body: JSON.stringify({ username, password }) });
    }
    // auto login
    const loginOut = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    setAuthState({ username: loginOut.username, token: loginOut.accessToken });
    show("catalog");
    loadCatalog();
  } catch (e) {
    $("#register-msg").textContent = e.message;
  }
});

$("#logout-btn").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username:null });
  show("hero");
});

// Toggle within account page
$("#show-register").addEventListener("click", () => {
  $("#login-form").classList.add("hidden");
  $("#register-form").classList.remove("hidden");
});
$("#show-login").addEventListener("click", () => {
  $("#register-form").classList.add("hidden");
  $("#login-form").classList.remove("hidden");
});

// --------------- Nav / Search / Modal controls ---------------
$("#modal-close").addEventListener("click", closeModal);
$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-account").addEventListener("click", () => show("account"));

$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

// --------------- Init ---------------
setAuthState({ username:null });

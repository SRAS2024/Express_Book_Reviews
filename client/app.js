// ========= Basic helpers =========
const $ = (sel) => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUser = null;
let currentISBN = null;
let starValue = 0;

// For catalog pagination
let allBooks = [];
let shownBooks = 0;
const booksPerPage = 20;
const booksPerClick = 10;

// Keep dropdown open by click, not hover
const userMenu = $("#user-menu");
const userNameBtn = $("#user-name");
userNameBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  userMenu.classList.toggle("open");
});
document.addEventListener("click", (e) => {
  if (!userMenu.contains(e.target)) userMenu.classList.remove("open");
});

// Force-hide modal on load
function forceHideModal() {
  const m = $("#book-modal");
  if (m) {
    m.classList.add("hidden");
    m.setAttribute("aria-hidden", "true");
  }
}
forceHideModal();

// Page switcher
function showPage(id) {
  ["home", "catalog", "account", "register", "forgot"].forEach((sec) => {
    const el = document.getElementById(sec);
    if (el) el.classList.toggle("hidden", sec !== id);
  });
  closeModal();

  // Clear sensitive inputs on navigation
  ["login-username","login-password","register-username","register-password",
   "forgot-username","forgot-password","search-input"].forEach(id=>{
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

// Auth state in header
function setAuthState({ username = null, token = null } = {}) {
  if (username) currentUser = username;
  if (token) localStorage.setItem(tokenKey, token);

  const hasToken = Boolean(localStorage.getItem(tokenKey));
  $("#nav-account").classList.toggle("hidden", hasToken);
  $("#user-menu").classList.toggle("hidden", !hasToken);

  if (hasToken && username) {
    $("#user-name").textContent = username;
  }

  if (!hasToken) {
    currentUser = null;
    $("#user-name").textContent = "";
    $("#user-menu").classList.remove("open");
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

// ========= Catalog =========
async function loadCatalog(query, genreFilter) {
  const grid = $("#grid");
  if (grid) grid.innerHTML = "";
  shownBooks = 0;
  allBooks = [];

  try {
    if (!query) {
      const data = await fetchJSON("/books");
      allBooks = data.books || [];
    } else {
      const [byTitle, byAuthor, byISBN, byGenre] = await Promise.all([
        fetchJSON(`/title/${encodeURIComponent(query)}`).catch(() => ({ books: [] })),
        fetchJSON(`/author/${encodeURIComponent(query)}`).catch(() => ({ books: [] })),
        fetchJSON(`/isbn/${encodeURIComponent(query)}`).catch(() => null),
        fetchJSON(`/genre/${encodeURIComponent(query)}`).catch(() => ({ books: [] })),
      ]);

      const merged = new Map();
      [...(byTitle.books || []), ...(byAuthor.books || []), ...(byGenre.books || [])].forEach((b) =>
        merged.set(b.isbn, b)
      );
      if (byISBN && byISBN.isbn) merged.set(byISBN.isbn, byISBN);

      allBooks = [...merged.values()];
    }

    if (genreFilter) {
      allBooks = allBooks.filter(b => (b.genre || "").toLowerCase() === genreFilter.toLowerCase());
    }
  } catch (e) {
    console.error(e);
  }

  renderMoreBooks();
}

function renderMoreBooks() {
  const grid = $("#grid");
  const moreBtn = $("#more-books");
  let count = 0;

  for (; shownBooks < allBooks.length && count < (shownBooks ? booksPerClick : booksPerPage); shownBooks++, count++) {
    const b = allBooks[shownBooks];
    const card = document.createElement("div");
    card.className = "tile";
    card.innerHTML = `
      <h4>${b.title}</h4>
      <p>${b.author}</p>
      <p class="muted">ISBN: ${b.isbn}</p>
      <p class="muted">Genre: ${b.genre || "N/A"}</p>
      <button class="btn view-btn" data-isbn="${b.isbn}">View</button>
    `;
    card.querySelector(".view-btn").addEventListener("click", () => openBook(b.isbn));
    grid.appendChild(card);
  }

  if (shownBooks >= allBooks.length) {
    moreBtn.classList.add("hidden");
  } else {
    moreBtn.classList.remove("hidden");
  }
}
$("#more-books")?.addEventListener("click", renderMoreBooks);

// ========= Book Modal =========
function closeModal() {
  const m = $("#book-modal");
  if (!m) return;
  m.classList.add("hidden");
  m.setAttribute("aria-hidden","true");
  $("#review-editor").classList.add("hidden");
}
$("#modal-close")?.addEventListener("click", closeModal);

async function openBook(isbn) {
  try {
    const b = await fetchJSON(`/isbn/${isbn}`);
    currentISBN = isbn;
    const info = $("#book-info");
    info.innerHTML = `
      <h2>${b.title}</h2>
      <p><strong>Author:</strong> ${b.author}</p>
      <p><strong>Genre:</strong> ${b.genre || "N/A"}</p>
      <p><strong>ISBN:</strong> ${b.isbn}</p>
    `;

    renderReviews(b.reviews || {});
    $("#book-modal").classList.remove("hidden");
    $("#book-modal").setAttribute("aria-hidden","false");
  } catch (e) {
    console.error(e);
  }
}

function renderReviews(reviews) {
  const list = $("#reviews-list");
  list.innerHTML = "";
  Object.entries(reviews).forEach(([username, r]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${username}</strong> (${r.rating}★): ${r.text}
    `;
    if (currentUser && username === currentUser) {
      const editBtn = document.createElement("span");
      editBtn.textContent = "✏️ Edit";
      editBtn.style.cursor = "pointer";
      editBtn.style.marginLeft = "8px";
      editBtn.addEventListener("click", () => {
        showReviewEditor(r.text, r.rating);
      });
      li.appendChild(editBtn);
    }
    list.appendChild(li);
  });
}

// ========= Review Editor =========
function showReviewEditor(text = "", rating = 0) {
  if (!currentUser) {
    alert("You must be logged in to add or edit a review.");
    return;
  }
  $("#review-editor").classList.remove("hidden");
  $("#my-review").value = text;
  starValue = rating;
  updateStarDisplay();
}

function updateStarDisplay() {
  const container = $("#star-input");
  container.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.className = "star" + (i <= starValue ? " active" : "");
    star.addEventListener("click", () => {
      starValue = i;
      updateStarDisplay();
    });
    container.appendChild(star);
  }
}

$("#add-review")?.addEventListener("click", () => showReviewEditor());
$("#save-review")?.addEventListener("click", async () => {
  const text = $("#my-review").value.trim();
  if (!text || !starValue) {
    $("#review-msg").textContent = "Please provide text and rating.";
    return;
  }
  try {
    const data = await fetchJSON(`/customer/auth/review/${currentISBN}`, {
      method: "PUT",
      headers: { ...authHeader() },
      body: JSON.stringify({ review: { text, rating: starValue } })
    });
    renderReviews(data.reviews || {});
    $("#review-editor").classList.add("hidden");
    $("#review-msg").textContent = "";
  } catch (e) {
    $("#review-msg").textContent = e.message;
  }
});
$("#delete-review")?.addEventListener("click", async () => {
  try {
    const data = await fetchJSON(`/customer/auth/review/${currentISBN}`, {
      method: "DELETE",
      headers: { ...authHeader() }
    });
    renderReviews(data.reviews || {});
    $("#review-editor").classList.add("hidden");
  } catch (e) {
    $("#review-msg").textContent = e.message;
  }
});

// ========= Search Suggestions =========
const searchInput = $("#search-input");
const suggestionBox = document.createElement("div");
suggestionBox.className = "card";
suggestionBox.style.position = "absolute";
suggestionBox.style.width = "100%";
suggestionBox.style.left = "0";
suggestionBox.style.display = "none";
searchInput.parentElement.appendChild(suggestionBox);

searchInput.addEventListener("input", async () => {
  const q = searchInput.value.trim();
  if (!q) {
    suggestionBox.style.display = "none";
    return;
  }
  try {
    const data = await fetchJSON(`/suggest/${encodeURIComponent(q)}`);
    const suggestions = data.suggestions || [];
    if (!suggestions.length) {
      suggestionBox.style.display = "none";
      return;
    }
    suggestionBox.innerHTML = "";
    suggestions.forEach(s => {
      const item = document.createElement("div");
      item.className = "link";
      item.textContent = `${s.title} (${s.author})`;
      item.addEventListener("click", () => {
        searchInput.value = s.title;
        suggestionBox.style.display = "none";
        loadCatalog(s.title);
      });
      suggestionBox.appendChild(item);
    });
    suggestionBox.style.display = "block";
  } catch {
    suggestionBox.style.display = "none";
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    suggestionBox.style.display = "none";
    loadCatalog(searchInput.value);
  }
});

// ========= Navigation =========
$("#nav-home")?.addEventListener("click", () => showPage("home"));
$("#nav-catalog")?.addEventListener("click", () => { showPage("catalog"); loadCatalog(); });
$("#nav-account")?.addEventListener("click", () => showPage("account"));
$("#get-started")?.addEventListener("click", () => { showPage("catalog"); loadCatalog(); });

// ========= Init =========
(async () => {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    setAuthState({ username: null, token: null });
    showPage("home");
    return;
  }
  try {
    const me = await fetchJSON("/customer/auth/me", { headers: authHeader() });
    setAuthState({ username: me.username, token });
  } catch {
    localStorage.removeItem(tokenKey);
    setAuthState({ username: null, token: null });
  }
  showPage("home");
})();

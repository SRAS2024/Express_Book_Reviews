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
const booksPerClick = 10; // per spec: 20 initially, +10 each click

// Keep dropdown open by click, not hover
const userMenu = $("#user-menu");
const userNameBtn = $("#user-name");
userNameBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  userMenu.classList.toggle("open");
});
document.addEventListener("click", (e) => {
  if (userMenu && !userMenu.contains(e.target)) userMenu.classList.remove("open");
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

// ========= Utilities =========
function clearInputsOnNav() {
  [
    "login-username",
    "login-password",
    "register-username",
    "register-password",
    "forgot-username",
    "forgot-password",
    "search-input",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

// Page switcher
function showPage(id) {
  ["home", "catalog", "account", "register", "forgot"].forEach((sec) => {
    const el = document.getElementById(sec);
    if (el) el.classList.toggle("hidden", sec !== id);
  });
  closeModal();
  clearInputsOnNav();
}

// Auth state in header
function setAuthState({ username = null, token = null } = {}) {
  if (username) currentUser = username;
  if (token) localStorage.setItem(tokenKey, token);

  const hasToken = Boolean(localStorage.getItem(tokenKey));
  $("#nav-account")?.classList.toggle("hidden", hasToken);
  $("#user-menu")?.classList.toggle("hidden", !hasToken);

  if (hasToken && username) {
    $("#user-name").textContent = username;
    $("#user-name").setAttribute("title", "Account");
  }

  if (!hasToken) {
    currentUser = null;
    $("#user-name").textContent = "";
    $("#user-name").removeAttribute("title");
    $("#user-menu")?.classList.remove("open");
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
  try {
    data = txt ? JSON.parse(txt) : {};
  } catch {
    data = { message: txt };
  }
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
      allBooks = allBooks.filter(
        (b) => (b.genre || "").toLowerCase() === genreFilter.toLowerCase()
      );
    }
  } catch (e) {
    console.error(e);
  }

  renderMoreBooks();
}

function renderMoreBooks() {
  const grid = $("#grid");
  const moreBtn = $("#more-books");
  if (!grid || !moreBtn) return;

  let count = 0;
  const batchSize = shownBooks ? booksPerClick : booksPerPage;

  for (
    ;
    shownBooks < allBooks.length && count < batchSize;
    shownBooks++, count++
  ) {
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

// ========= Book Modal and Reviews =========
function closeModal() {
  const m = $("#book-modal");
  if (!m) return;
  // clear editor every time modal closes
  hideEditor(true);
  m.classList.add("hidden");
  m.setAttribute("aria-hidden", "true");
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
    hideEditor(true);

    $("#book-modal").classList.remove("hidden");
    $("#book-modal").setAttribute("aria-hidden", "false");
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
      editBtn.className = "link";
      editBtn.style.marginLeft = "8px";
      editBtn.addEventListener("click", () => {
        showEditor();
        $("#my-review").value = r.text || "";
        starValue = Number(r.rating || 0);
        updateStarDisplay();
      });
      li.appendChild(editBtn);
    }

    list.appendChild(li);
  });
}

// Editor helpers
function showEditor() {
  $("#review-editor").classList.remove("hidden");
  $("#review-msg").textContent = "";
  ensureStarWidget();
}
function hideEditor(clear = false) {
  $("#review-editor").classList.add("hidden");
  $("#review-msg").textContent = "";
  if (clear) {
    $("#my-review").value = "";
    starValue = 0;
    updateStarDisplay();
  }
}

function ensureStarWidget() {
  const wrap = $("#star-input");
  if (!wrap) return;
  if (wrap.childElementCount) return;

  for (let i = 1; i <= 5; i++) {
    const s = document.createElement("span");
    s.textContent = "★";
    s.className = "star";
    s.dataset.val = String(i);
    s.addEventListener("mouseenter", () => previewStars(i));
    s.addEventListener("mouseleave", () => updateStarDisplay());
    s.addEventListener("click", () => {
      starValue = i;
      updateStarDisplay();
    });
    wrap.appendChild(s);
  }
  updateStarDisplay();
}

function previewStars(n) {
  document.querySelectorAll("#star-input .star").forEach((el, idx) => {
    el.classList.toggle("active", idx < n);
  });
}
function updateStarDisplay() {
  document.querySelectorAll("#star-input .star").forEach((el, idx) => {
    el.classList.toggle("active", idx < starValue);
  });
}

// Add Review button
$("#add-review")?.addEventListener("click", () => {
  const hasToken = Boolean(localStorage.getItem(tokenKey));
  if (!hasToken) {
    $("#review-msg").textContent = "Please login to write a review.";
    return;
  }
  showEditor();
  $("#my-review").value = "";
  starValue = 0;
  updateStarDisplay();
});

// Save review
$("#save-review")?.addEventListener("click", async () => {
  const msg = $("#review-msg");
  msg.textContent = "";

  if (!currentISBN) {
    msg.textContent = "No book is open.";
    return;
  }
  const text = $("#my-review").value.trim();
  if (!text || !starValue) {
    msg.textContent = "Please choose a rating and write your review.";
    return;
  }

  try {
    const data = await fetchJSON(`/customer/auth/review/${encodeURIComponent(currentISBN)}`, {
      method: "PUT",
      headers: { ...authHeader() },
      body: JSON.stringify({ review: { text, rating: starValue } }),
    });
    renderReviews(data.reviews || {});
    hideEditor(true);
    msg.textContent = "Saved.";
  } catch (e) {
    msg.textContent = e.message || "Failed to save.";
  }
});

// Delete review
$("#delete-review")?.addEventListener("click", async () => {
  const msg = $("#review-msg");
  msg.textContent = "";

  if (!currentISBN) {
    msg.textContent = "No book is open.";
    return;
  }
  try {
    const data = await fetchJSON(
      `/customer/auth/review/${encodeURIComponent(currentISBN)}`,
      { method: "DELETE", headers: { ...authHeader() } }
    );
    renderReviews(data.reviews || {});
    hideEditor(true);
    msg.textContent = "Deleted.";
  } catch (e) {
    msg.textContent = e.message || "Failed to delete.";
  }
});

// ========= Search and Suggestions =========
const searchInput = $("#search-input");
const suggestionBox = document.createElement("div");
suggestionBox.className = "card";
suggestionBox.style.display = "none";
searchInput?.parentElement?.appendChild(suggestionBox);

searchInput?.addEventListener("input", async () => {
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
    suggestions.forEach((s) => {
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

searchInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    suggestionBox.style.display = "none";
    loadCatalog(searchInput.value.trim());
  }
});

$("#search-btn")?.addEventListener("click", () => {
  suggestionBox.style.display = "none";
  loadCatalog(searchInput.value.trim());
});
$("#clear-search")?.addEventListener("click", () => {
  searchInput.value = "";
  suggestionBox.style.display = "none";
  loadCatalog();
});
$("#more-books")?.addEventListener("click", renderMoreBooks);

// ========= Navigation wiring =========
$("#nav-home")?.addEventListener("click", () => showPage("home"));
$("#nav-catalog")?.addEventListener("click", () => {
  showPage("catalog");
  loadCatalog();
});
$("#nav-account")?.addEventListener("click", () => showPage("account"));
$("#get-started")?.addEventListener("click", () => {
  showPage("catalog");
  loadCatalog();
});

// ========= Auth: Login, Register, Forgot, Reset, Logout =========
$("#login-btn")?.addEventListener("click", async () => {
  const u = $("#login-username").value.trim();
  const p = $("#login-password").value.trim();
  const msg = $("#login-msg");
  msg.textContent = "";
  if (!u || !p) {
    msg.textContent = "Enter username and password.";
    return;
  }
  try {
    const data = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username: u, password: p }),
    });
    setAuthState({ username: data.username, token: data.accessToken });
    showPage("catalog");
    await loadCatalog();
  } catch (e) {
    msg.textContent = e.message || "Login failed.";
  }
});

$("#register-btn")?.addEventListener("click", async () => {
  const u = $("#register-username").value.trim();
  const p = $("#register-password").value.trim();
  const msg = $("#register-msg");
  msg.textContent = "";
  if (!u || !p) {
    msg.textContent = "Choose a username and password.";
    return;
  }
  try {
    await fetchJSON("/customer/register", {
      method: "POST",
      body: JSON.stringify({ username: u, password: p }),
    });
    const data = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username: u, password: p }),
    });
    setAuthState({ username: data.username, token: data.accessToken });
    showPage("catalog");
    await loadCatalog();
  } catch (e) {
    msg.textContent = e.message || "Registration failed.";
  }
});

$("#logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username: null, token: null });
  showPage("home");
});

// Forgot and reset, two step
let forgotReadyForReset = false;
$("#forgot-continue")?.addEventListener("click", async () => {
  const u = $("#forgot-username").value.trim();
  const msg = $("#forgot-msg");
  msg.textContent = "";

  if (!forgotReadyForReset) {
    if (!u) {
      msg.textContent = "Enter your username.";
      return;
    }
    try {
      await fetchJSON("/customer/forgot", {
        method: "POST",
        body: JSON.stringify({ username: u }),
      });
      $("#new-pass-field").classList.remove("hidden");
      $("#forgot-continue").textContent = "Reset Password";
      forgotReadyForReset = true;
      msg.textContent = "Enter your new password, then press Reset Password.";
    } catch (e) {
      msg.textContent = e.message || "User not found.";
      $("#forgot-username").classList.add("error");
    }
  } else {
    const p = $("#forgot-password").value.trim();
    if (!p) {
      msg.textContent = "Enter a new password.";
      return;
    }
    try {
      const data = await fetchJSON("/customer/reset", {
        method: "POST",
        body: JSON.stringify({ username: u, newPassword: p }),
      });
      setAuthState({ username: data.username, token: data.accessToken });
      showPage("catalog");
      await loadCatalog();
    } catch (e) {
      msg.textContent = e.message || "Reset failed.";
    } finally {
      // clean up state
      forgotReadyForReset = false;
      $("#new-pass-field").classList.add("hidden");
      $("#forgot-continue").textContent = "Continue";
    }
  }
});

// Cross links between auth pages
$("#forgot-link")?.addEventListener("click", () => showPage("forgot"));
$("#go-register")?.addEventListener("click", () => showPage("register"));
$("#go-login-from-forgot")?.addEventListener("click", () => showPage("account"));
$("#go-login-from-register")?.addEventListener("click", () => showPage("account"));

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
  showPage("home"); // default landing

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
const booksPerClick = 5;

// Keep dropdown open by click, not hover
const userMenu = $("#user-menu");
const userNameBtn = $("#user-name");
userNameBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  userMenu.classList.toggle("open");
});
// Click outside closes it
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
    $("#user-name").setAttribute("title", "Log out");
  }

  if (!hasToken) {
    currentUser = null;
    $("#user-name").textContent = "";
    $("#user-name").removeAttribute("title");
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
      // search by title, author, isbn, genre
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

// ========= Search Suggestions =========
const searchInput = $("#search-input");
const suggestionBox = document.createElement("div");
suggestionBox.className = "card";
suggestionBox.style.position = "absolute";
suggestionBox.style.background = "#111827";
suggestionBox.style.zIndex = "20";
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

// ========= Forgot Password Flow =========
$("#forgot-link")?.addEventListener("click", () => showPage("forgot"));

$("#forgot-continue")?.addEventListener("click", async () => {
  const username = $("#forgot-username").value.trim();
  const msg = $("#forgot-msg");
  msg.textContent = "";

  if (!username) {
    msg.textContent = "Please enter a username.";
    return;
  }

  try {
    await fetchJSON("/customer/forgot", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    // valid username
    $("#new-pass-field").classList.remove("hidden");
    $("#forgot-continue").textContent = "Reset Password";
    $("#forgot-continue").id = "forgot-reset"; // swap button action
    $("#forgot-msg").textContent = "Enter a new password.";
    document.querySelector("#forgot-reset").addEventListener("click", async () => {
      const newPassword = $("#forgot-password").value;
      if (!newPassword) {
        $("#forgot-msg").textContent = "Please enter a new password.";
        return;
      }
      try {
        const out = await fetchJSON("/customer/reset", {
          method: "POST",
          body: JSON.stringify({ username, newPassword }),
        });
        setAuthState({ username: out.username, token: out.accessToken });
        showPage("catalog");
        loadCatalog();
      } catch (e) {
        $("#forgot-msg").textContent = e.message;
      }
    }, { once: true });
  } catch (e) {
    msg.textContent = e.message;
    $("#forgot-username").style.borderColor = "red";
  }
});

// ========= Auth actions =========
$("#login-btn")?.addEventListener("click", async () => {
  const username = $("#login-username").value.trim();
  const password = $("#login-password").value;
  const msg = $("#login-msg");
  msg.textContent = "";

  if (!username || !password) {
    msg.textContent = "Please enter both username and password.";
    return;
  }

  try {
    const out = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setAuthState({ username: out.username, token: out.accessToken });
    showPage("catalog");
    loadCatalog();
  } catch (e) {
    msg.textContent = e.message;
  }
});

$("#register-btn")?.addEventListener("click", async () => {
  const username = $("#register-username").value.trim();
  const password = $("#register-password").value;
  const msg = $("#register-msg");
  msg.textContent = "";

  if (!username || !password) {
    msg.textContent = "Please enter both username and password.";
    return;
  }

  try {
    await fetchJSON("/customer/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const login = await fetchJSON("/customer/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setAuthState({ username: login.username, token: login.accessToken });
    showPage("catalog");
    loadCatalog();
  } catch (e) {
    msg.textContent = e.message;
  }
});

$("#logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthState({ username: null, token: null });
  showPage("home");
});

// Switchers
$("#go-register")?.addEventListener("click", () => showPage("register"));
$("#go-login")?.addEventListener("click", () => showPage("account"));

// Nav
$("#nav-home").addEventListener("click", () => showPage("home"));
$("#nav-catalog").addEventListener("click", () => { showPage("catalog"); loadCatalog(); });
$("#nav-account").addEventListener("click", () => showPage("account"));
$("#get-started").addEventListener("click", () => { showPage("catalog"); loadCatalog(); });

$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });
$("#more-books").addEventListener("click", () => renderMoreBooks());

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

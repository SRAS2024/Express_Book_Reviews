const $ = sel => document.querySelector(sel);
const tokenKey = "brs_token";
let currentUsername = null;

function setAuthState({ username, token }) {
  currentUsername = username || null;
  if (token) localStorage.setItem(tokenKey, token);
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
  const list = $("#reviews-list");
  list.innerHTML = "";
  Object.entries(reviews.reviews || {}).forEach(([user, text]) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${text}`;
    list.appendChild(li);
  });

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
}

$("#modal-close").addEventListener("click", closeModal);
$("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
$("#nav-home").addEventListener("click", () => show("hero"));
$("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });

// Account handling
const accountModal = $("#account-modal");
const accountContent = $("#account-content");
$("#account-close").addEventListener("click", () => accountModal.classList.add("hidden"));

$("#nav-account").addEventListener("click", () => {
  if (currentUsername) {
    accountContent.innerHTML = `
      <p>Signed in as <strong>${currentUsername}</strong></p>
      <button id="logout-btn" class="btn btn-danger">Logout</button>
    `;
    accountModal.classList.remove("hidden");
    $("#logout-btn").onclick = () => {
      localStorage.removeItem(tokenKey);
      setAuthState({ username: null });
      accountModal.classList.add("hidden");
      show("hero");
    };
  } else {
    accountContent.innerHTML = `
      <h3>Login</h3>
      <label>Username <input id="login-user" class="input"></label>
      <label>Password <input id="login-pass" type="password" class="input"></label>
      <button id="login-btn" class="btn-primary">Login</button>
      <p id="login-msg" class="msg"></p>
      <p>Don't have an account? <a id="show-register" href="#">Create account</a></p>
    `;
    accountModal.classList.remove("hidden");

    $("#login-btn").onclick = async () => {
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
        accountModal.classList.add("hidden");
      } catch (e) {
        $("#login-msg").textContent = e.message;
      }
    };

    $("#show-register").onclick = e => {
      e.preventDefault();
      accountContent.innerHTML = `
        <h3>Register</h3>
        <label>Username <input id="reg-user" class="input"></label>
        <label>Password <input id="reg-pass" type="password" class="input"></label>
        <button id="register-btn" class="btn">Register</button>
        <p id="register-msg" class="msg"></p>
      `;
      $("#register-btn").onclick = async () => {
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
      };
    };
  }
});

// Search
$("#search-btn").addEventListener("click", () => loadCatalog($("#search-input").value));
$("#clear-search").addEventListener("click", () => { $("#search-input").value = ""; loadCatalog(); });

// Init
setAuthState({ username: null });

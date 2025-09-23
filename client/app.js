document.addEventListener("DOMContentLoaded", () => {
  const $ = sel => document.querySelector(sel);
  const tokenKey = "brs_token";
  let currentUsername = null;

  function setAuthState({ username, token }) {
    if (token) localStorage.setItem(tokenKey, token);
    if (username) currentUsername = username;

    const loggedIn = Boolean(localStorage.getItem(tokenKey));
    const accountLabel = $("#account-label");
    const dropdown = $("#account-dropdown");

    if (loggedIn && currentUsername) {
      accountLabel.textContent = currentUsername;
      dropdown.classList.add("hidden");
      $("#signed-out").classList.add("hidden");
    } else {
      accountLabel.textContent = "Account";
      dropdown.classList.add("hidden");
      $("#signed-out").classList.remove("hidden");
      $("#register-card").classList.add("hidden");
      currentUsername = null;
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
      try { const j = await res.json(); if (j.message) msg = j.message; } catch {}
      throw new Error(msg);
    }
    return res.json();
  }

  function show(sectionId) {
    ["hero", "catalog", "account"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });
    const tgt = document.getElementById(sectionId);
    if (tgt) tgt.classList.remove("hidden");
  }

  async function loadCatalog() {
    const grid = $("#grid");
    grid.innerHTML = "";
    let books = [];
    try {
      const data = await fetchJSON("/books");
      books = data.books;
    } catch (e) {
      grid.innerHTML = `<div class="card">Error loading books: ${e.message}</div>`;
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
    const book = await fetchJSON(`/isbn/${isbn}`);
    const reviews = await fetchJSON(`/review/${isbn}`).catch(() => ({ reviews: {} }));

    $("#book-info").innerHTML = `<h3>${book.title}</h3><p>Author: ${book.author}</p><p>ISBN: ${book.isbn}</p>`;
    renderReviews(reviews.reviews || {});

    $("#add-review-btn").onclick = () => {
      if (!localStorage.getItem(tokenKey)) {
        show("account");
        $("#login-msg").textContent = "Please log in to add a review.";
        return;
      }
      $("#review-editor").classList.remove("hidden");
    };

    $("#submit-review").onclick = async () => {
      const stars = $("#star-rating").value;
      const text = $("#my-review").value.trim();
      const reviewText = `${"★".repeat(stars)}${"☆".repeat(5 - stars)} - ${text}`;
      const out = await fetchJSON(`/customer/auth/review/${isbn}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ review: reviewText })
      });
      renderReviews(out.reviews);
      $("#review-editor").classList.add("hidden");
      $("#my-review").value = "";
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
    const entries = Object.entries(reviews);
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
        entries.slice(0, 10).forEach(([user, text]) => {
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

  $("#modal-close").addEventListener("click", () => $("#book-modal").classList.add("hidden"));
  $("#get-started").addEventListener("click", () => { show("catalog"); loadCatalog(); });
  $("#nav-home").addEventListener("click", () => show("hero"));
  $("#nav-catalog").addEventListener("click", () => { show("catalog"); loadCatalog(); });
  $("#nav-account").addEventListener("click", () => show("account"));

  $("#login-btn").addEventListener("click", async () => {
    const username = $("#login-user").value.trim();
    const password = $("#login-pass").value;
    try {
      const out = await fetchJSON("/customer/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
      setAuthState({ username: out.username, token: out.accessToken });
      show("hero");
    } catch (e) {
      $("#login-msg").textContent = e.message;
    }
  });

  $("#register-btn").addEventListener("click", async () => {
    const username = $("#reg-user").value.trim();
    const password = $("#reg-pass").value;
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

  $("#link-create-account").addEventListener("click", e => {
    e.preventDefault();
    $("#register-card").classList.remove("hidden");
  });

  $("#logout-btn").addEventListener("click", () => {
    localStorage.removeItem(tokenKey);
    setAuthState({ username: null });
    show("hero");
  });

  setAuthState({ username: null });
  show("hero");
});

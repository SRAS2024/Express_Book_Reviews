document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");
  const nav = document.querySelector(".nav");

  // Session helpers
  function getToken() {
    return localStorage.getItem("token");
  }
  function getUsername() {
    return localStorage.getItem("username");
  }
  function setSession(username, token) {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  }
  function clearSession() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  }

  // Render nav
  function renderNav() {
    nav.innerHTML = `
      <button class="btn" data-page="home">Home</button>
      <button class="btn" data-page="catalog">Catalog</button>
      ${
        getToken()
          ? `<div class="dropdown">
              <button class="btn">${getUsername()}</button>
              <div class="dropdown-content">
                <button id="logout" class="btn btn-danger">Logout</button>
              </div>
             </div>`
          : `<button class="btn" data-page="account">Account</button>`
      }
    `;

    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        clearSession();
        renderNav();
        renderHome();
      });
    }

    nav.querySelectorAll("[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const page = btn.getAttribute("data-page");
        if (page === "home") renderHome();
        if (page === "catalog") loadCatalog();
        if (page === "account") renderLogin();
      });
    });
  }

  // Home
  function renderHome() {
    main.innerHTML = `
      <div class="card">
        <h2>Welcome</h2>
        <p>Browse books, read reviews, and share your thoughts after you login.</p>
        <button id="get-started" class="btn btn-primary">Get started</button>
      </div>
    `;
    document
      .getElementById("get-started")
      .addEventListener("click", () => loadCatalog());
  }

  // Catalog
  async function loadCatalog() {
    main.innerHTML = `<div class="card"><h2>Catalog</h2><div id="catalog" class="grid"></div></div>`;
    const container = document.getElementById("catalog");

    try {
      const res = await fetch("/books");
      const books = await res.json();

      books.forEach((book) => {
        const div = document.createElement("div");
        div.className = "tile";
        div.innerHTML = `
          <h4>${book.title}</h4>
          <p>${book.author}</p>
          <button class="btn btn-secondary">View</button>
        `;
        div.querySelector("button").addEventListener("click", () => {
          openBookModal(book);
        });
        container.appendChild(div);
      });
    } catch (err) {
      console.error("Error loading catalog:", err);
    }
  }

  // Login
  function renderLogin() {
    main.innerHTML = `
      <div class="card auth-card">
        <h2>Login</h2>
        <input id="login-username" class="input" placeholder="Username">
        <input id="login-password" class="input" type="password" placeholder="Password">
        <button id="login-btn" class="btn btn-primary">Login</button>
        <p>No account? <span id="to-register" class="link">Create Account</span></p>
      </div>
    `;

    document.getElementById("login-btn").addEventListener("click", async () => {
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();
      try {
        const res = await fetch("/customer/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok) {
          setSession(data.username, data.accessToken);
          renderNav();
          loadCatalog();
        } else {
          alert(data.message || "Login failed");
        }
      } catch {
        alert("Network error");
      }
    });

    document.getElementById("to-register").addEventListener("click", () => {
      renderRegister();
    });
  }

  // Register
  function renderRegister() {
    main.innerHTML = `
      <div class="card auth-card">
        <h2>Create Account</h2>
        <input id="reg-username" class="input" placeholder="Username">
        <input id="reg-password" class="input" type="password" placeholder="Password">
        <button id="register-btn" class="btn btn-primary">Register</button>
        <p><span id="back-login" class="link">Back to Login</span></p>
      </div>
    `;

    document
      .getElementById("register-btn")
      .addEventListener("click", async () => {
        const username = document.getElementById("reg-username").value.trim();
        const password = document.getElementById("reg-password").value.trim();
        try {
          const res = await fetch("/customer/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
          const data = await res.json();
          if (res.ok) {
            setSession(username, data.accessToken || "");
            renderNav();
            loadCatalog();
          } else {
            alert(data.message || "Registration failed");
          }
        } catch {
          alert("Network error");
        }
      });

    document.getElementById("back-login").addEventListener("click", () => {
      renderLogin();
    });
  }

  // Book modal with review
  function openBookModal(book) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content card">
        <button class="btn-close">&times;</button>
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>ISBN:</strong> ${book.isbn}</p>
        ${
          getToken()
            ? `
          <h3>Your review</h3>
          <select id="review-rating">
            <option value="">Rating</option>
            <option value="1">★</option>
            <option value="2">★★</option>
            <option value="3">★★★</option>
            <option value="4">★★★★</option>
            <option value="5">★★★★★</option>
          </select>
          <textarea id="review-text" placeholder="Write your review..."></textarea>
          <div class="toolbar">
            <button id="save-review" class="btn btn-primary">Save</button>
            <button id="delete-review" class="btn btn-danger">Delete</button>
          </div>
        `
            : `<p>Please login to add a review.</p>`
        }
        <h3>All reviews</h3>
        <ul class="list" id="reviews-list"></ul>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".btn-close").addEventListener("click", () => modal.remove());

    if (getToken()) {
      modal.querySelector("#save-review").addEventListener("click", async () => {
        const rating = modal.querySelector("#review-rating").value;
        const text = modal.querySelector("#review-text").value.trim();
        if (!rating || !text) {
          alert("Please provide both a rating and review text.");
          return;
        }
        try {
          const res = await fetch(`/customer/auth/review/${book.isbn}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ review: `${text} (${rating} stars)` }),
          });
          if (res.ok) {
            modal.remove();
            loadCatalog();
          } else {
            alert("Error saving review");
          }
        } catch {
          alert("Network error");
        }
      });

      modal.querySelector("#delete-review").addEventListener("click", async () => {
        try {
          const res = await fetch(`/customer/auth/review/${book.isbn}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
          if (res.ok) {
            modal.remove();
            loadCatalog();
          } else {
            alert("Error deleting review");
          }
        } catch {
          alert("Network error");
        }
      });
    }

    // Load reviews
    const reviewsList = modal.querySelector("#reviews-list");
    if (book.reviews) {
      Object.entries(book.reviews).forEach(([user, review]) => {
        const li = document.createElement("li");
        li.textContent = `${user}: ${review}`;
        reviewsList.appendChild(li);
      });
    }
  }

  // Init
  renderNav();
  renderHome();
});

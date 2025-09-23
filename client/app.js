function openBookModal(book) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content card">
      <button class="btn-close">&times;</button>
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>ISBN:</strong> ${book.isbn}</p>

      <h3>Your review</h3>
      <div>
        <label>Rating:</label>
        <select id="review-rating">
          <option value="">--</option>
          <option value="1">★</option>
          <option value="2">★★</option>
          <option value="3">★★★</option>
          <option value="4">★★★★</option>
          <option value="5">★★★★★</option>
        </select>
      </div>
      <textarea id="review-text" placeholder="Write your review..."></textarea>
      <div class="toolbar">
        <button id="save-review" class="btn btn-primary">Save</button>
        <button id="delete-review" class="btn btn-danger">Delete</button>
      </div>

      <h3>All reviews</h3>
      <ul class="list" id="reviews-list"></ul>
    </div>
  `;
  document.body.appendChild(modal);

  // ❌ close button
  modal.querySelector(".btn-close").addEventListener("click", () => modal.remove());

  // Save review
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
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ review: `${text} (${rating} stars)` })
      });

      if (res.ok) {
        alert("Review saved!");
        modal.remove();
        loadCatalog(); // refresh books
      } else {
        alert("Error saving review.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  });

  // Delete review
  modal.querySelector("#delete-review").addEventListener("click", async () => {
    try {
      const res = await fetch(`/customer/auth/review/${book.isbn}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (res.ok) {
        alert("Review deleted!");
        modal.remove();
        loadCatalog(); // refresh
      } else {
        alert("Error deleting review.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  });

  // Load all reviews
  const reviewsList = modal.querySelector("#reviews-list");
  if (book.reviews) {
    Object.entries(book.reviews).forEach(([user, review]) => {
      const li = document.createElement("li");
      li.textContent = `${user}: ${review}`;
      reviewsList.appendChild(li);
    });
  }
}

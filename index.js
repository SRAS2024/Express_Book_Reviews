const express = require("express");
const session = require("express-session");
const path = require("path");

// Import middleware + routes
const { verifyJwt } = require("./middleware/auth");
const customer_routes = require("./auth_users").authenticated;
const genl_routes = require("./general").general;

const app = express();
const PORT = process.env.PORT || 5000;

// Parse JSON
app.use(express.json());

// Session middleware for customer routes
app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

// Serve static frontend (client folder)
app.use(express.static(path.join(__dirname, "client")));

// Protect customer auth routes with JWT
app.use("/customer/auth/*", verifyJwt);

// Register routers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Catch-all: serve index.html for unknown routes
// This lets front-end navigation work correctly
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Start server
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);

const express = require("express");
const session = require("express-session");
const path = require("path");

// Middleware
const { verifyJwt } = require("./middleware/auth");

// Routers
const customer_routes = require("./router/auth_users").authenticated;
const genl_routes = require("./router/general").general;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
  })
);

// ✅ Serve only /client as static frontend
app.use(express.static(path.join(__dirname, "client")));

// Protect customer routes
app.use("/customer/auth/*", verifyJwt);

// Routers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// ✅ Route root (/) to frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// ✅ Catch-all for frontend navigation (avoid exposing backend files)
app.get(/^\/(?!customer|api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

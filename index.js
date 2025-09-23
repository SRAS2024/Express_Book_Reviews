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

// ✅ Serve static frontend only from /client
const clientPath = path.join(__dirname, "client");
app.use(express.static(clientPath));

// ✅ API routes (backend)
app.use("/customer/auth/*", verifyJwt);
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// ✅ Serve frontend index.html for non-API routes
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Catch-all: only for frontend routes, not backend
app.get(/^\/(?!customer|api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Fallback for unknown API
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/customer") || req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ message: "Route not found" });
  }
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

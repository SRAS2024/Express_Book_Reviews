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

// JSON body parsing
app.use(express.json());

// Sessions (only on /customer scope)
app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
  })
);

// Serve static frontend
app.use(express.static(path.join(__dirname, "client")));

// Public routes
app.use("/", genl_routes);

// Protect only /customer/auth/* BEFORE mounting router
app.use("/customer/auth", verifyJwt);

// Customer routes (register, login, auth, reviews)
app.use("/customer", customer_routes);

// Frontend routes -> index.html
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// 404 fallback
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);

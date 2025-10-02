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

// Sessions (on /customer scope)
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

// Protected routes: only /customer/auth/* is gated
app.use("/customer/auth", verifyJwt);

// Customer routes (register, login, forgot, reset, auth, reviews)
app.use("/customer", customer_routes);

// SPA fallback for frontend
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// 404 fallback for any API miss (after SPA fallback this rarely runs)
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);

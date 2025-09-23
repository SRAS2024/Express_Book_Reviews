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

// Static client
app.use(express.static(path.join(__dirname, "client")));

// Protect customer routes that require login
app.use("/customer/auth/*", verifyJwt);

// Routers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Fallback for unknown routes (optional but useful)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () =>
  console.log(`✅ Server is running at http://localhost:${PORT}`)
);

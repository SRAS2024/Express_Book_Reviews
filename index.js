 express = require("express");
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

// Guard all “/customer/auth/*” routes with JWT
app.use("/customer/auth", verifyJwt);

// API routers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Frontend routes -> index.html
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// 404 for any other API miss (after SPA fallback this rarely runs)
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);

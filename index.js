const express = require("express");
const session = require("express-session");
const path = require("path");

const { verifyJwt } = require("./middleware/auth");
const customer_routes = require("./auth_users").authenticated;
const genl_routes = require("./general").general;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Session only under /customer
app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
  })
);

// Serve client
app.use(express.static(path.join(__dirname, "client")));

// Protect customer auth routes
app.use("/customer/auth/*", verifyJwt);

// Routers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Fallback to SPA entry
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

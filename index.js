const express = require("express");
const session = require("express-session");
const path = require("path");

// Adjusted paths because index.js is now at root
const { verifyJwt } = require("./middleware/auth");
const customer_routes = require("./router/auth_users").authenticated;
const genl_routes = require("./router/general").general;

const app = express();

// Use dynamic port for Railway, fallback for local dev
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
  })
);

// Serve static files from client folder
app.use(express.static(path.join(__dirname, "client")));

// Protect all customer auth routes
app.use("/customer/auth/*", verifyJwt);

// Routers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);

const express = require("express");
const session = require("express-session");
const path = require("path");
const { verifyJwt } = require("./middleware/auth");
const customer_routes = require("./router/auth_users").authenticated;
const genl_routes = require("./router/general").general;

const app = express();

// Use dynamic port if provided by host, fallback to 5000 locally
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

// Static client
app.use(express.static(path.join(__dirname, "client")));

// Protect all customer auth routes
app.use("/customer/auth/*", verifyJwt);

// Routers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);

const express = require("express");
const session = require("express-session");
const path = require("path");
const { verifyJwt } = require("./final_project/middleware/auth");
const customer_routes = require("./final_project/router/auth_users").authenticated;
const genl_routes = require("./final_project/router/general").general;

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

// Static client
app.use(express.static(path.join(__dirname, "final_project/client")));

// Protect all customer auth routes
app.use("/customer/auth/*", verifyJwt);

// Routers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);

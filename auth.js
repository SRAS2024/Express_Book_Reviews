const jwt = require("jsonwebtoken");
const SECRET = "jwt_secret_123";

function verifyJwt(req, res, next) {
  // Accept Authorization Bearer or session storage
  const header = req.headers.authorization || "";
  let token = null;

  if (header.startsWith("Bearer ")) {
    token = header.substring(7);
  } else if (req.session && req.session.authorization && req.session.authorization.accessToken) {
    token = req.session.authorization.accessToken;
  }

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.user = { username: payload.username };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { verifyJwt, SECRET };

const jwt = require("jsonwebtoken");

// Use a consistent secret (same one you use in index.js / login logic)
const SECRET = "fingerprint_customer";  

function verifyJwt(req, res, next) {
  // Look for token in Authorization header or session
  const header = req.headers.authorization || "";
  let token = null;

  if (header.startsWith("Bearer ")) {
    token = header.substring(7);
  } else if (req.session?.authorization?.accessToken) {
    token = req.session.authorization.accessToken;
  }

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.user = { username: payload.username }; // attach decoded user info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { verifyJwt, SECRET };

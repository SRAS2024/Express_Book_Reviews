// In-memory user store. Use a real DB in production.
let users = []; // { username, password }

function isValid(username) {
  return typeof username === "string" && username.trim().length >= 3;
}

function doesUserExist(username) {
  return users.find(u => u.username === username);
}

function register(username, password) {
  if (!isValid(username) || typeof password !== "string" || password.length < 4) {
    return { ok: false, msg: "Invalid username or password" };
  }
  if (doesUserExist(username)) {
    return { ok: false, msg: "User already exists" };
  }
  users.push({ username, password });
  return { ok: true };
}

function authenticate(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  return !!user;
}

module.exports = {
  users,
  isValid,
  doesUserExist,
  register,
  authenticate
};

// In-memory user store (reset when server restarts)
let users = {};

// Register a new user
function registerUser(username, password) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }
  if (users[username]) {
    throw new Error("User already exists");
  }
  users[username] = { username, password };
  return users[username];
}

// Find user by username
function findUser(username) {
  return users[username] || null;
}

// Validate login credentials
function validateUser(username, password) {
  const user = findUser(username);
  if (!user || user.password !== password) {
    return null;
  }
  return user;
}

// Reset password for existing user
function resetPassword(username, newPassword) {
  const user = findUser(username);
  if (!user) {
    throw new Error("Invalid Username");
  }
  user.password = newPassword;
  return user;
}

// Export helpers
module.exports = {
  registerUser,
  findUser,
  validateUser,
  resetPassword,
  _users: users, // for debugging
};

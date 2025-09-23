// Simple in-memory user store
let users = [
  // sample user for quick testing: user "test" with password "test"
  { username: "test", password: "test" }
];

function isValid(username) {
  return users.some(u => u.username === username);
}

function authenticateUser(username, password) {
  return users.find(u => u.username === username && u.password === password);
}

function addUser(username, password) {
  users.push({ username, password });
}

module.exports = { users, isValid, authenticateUser, addUser };

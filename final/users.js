const uuid = require("uuid").v4;

let users = {};
const loggedInUsers = new Set();

function createUser(username, userData) {
    users[username] = userData;
}

function getUserData(username) {
    return users[username];
}

function updateUserName(username, newName) {
    if (newName != username) {
        Object.defineProperty(obj, newName, Object.getOwnPropertyDescriptor(obj, old_key));
        delete obj[username];
    }
}

function addLoggedInUsers(username) {
    loggedInUsers.add(username);
}

function getLoggedInUsers() {
    return Array.from(loggedInUsers);
}

function removeLoggedUser(username) {
    loggedInUsers.delete(username);
}

function isValidUsername(username) {
    return !!username && username.trim() && /^[A-Za-z0-9_]+$/.test(username);
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !!email && emailRegex.test(email);
}

module.exports = {
    createUser,
    getUserData,

    updateUserName,
    addLoggedInUsers,
    getLoggedInUsers,
    removeLoggedUser,

    isValidUsername,
    isValidEmail,
};

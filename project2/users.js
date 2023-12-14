const users = {};
const loggedInUsers = new Set();

function isValid(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function getUserData(username) {
    return users[username];
}

function addUserData(username, userData) {
    users[username] = userData;
    loggedInUsers.add(username);
}

function removeUserData(username) {
    loggedInUsers.delete(username);
}

function getLoggedInUsers() {
    return Array.from(loggedInUsers);
}

module.exports = {
    isValid,
    getUserData,
    addUserData,
    removeUserData,
    getLoggedInUsers,
};

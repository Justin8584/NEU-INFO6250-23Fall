const sessions = {}; // { '2cdd828a-62e3-45cc-b273-9db41da75014': 'Jorts', }
const players = {}; // { 'Jorts': { secretWord: '', guesses: [], ... } }

function createSession(sid, username) {
    sessions[sid] = username;
};

function getSession(sid) {
    return sessions[sid];
};

function deleteSession(sid) {
    delete sessions[sid];
}

function createPlayer(username, phase) {
    players[username] = phase;
}

function getPlayer(username) {
    return players[username];
}

function updatePlayer(username, phase) {
    players[username] = phase;
}

function deletePlayer(username) {
    delete players[username];
}

const database = {
    sessions,
    players,

    createSession,
    getSession,
    deleteSession,

    createPlayer,
    getPlayer,
    updatePlayer,
    deletePlayer,

};
module.exports = database;
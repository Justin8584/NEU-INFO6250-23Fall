const sessions = {}; // { '2cdd828a-62e3-45cc-b273-9db41da75014': 'Jorts', }
const userData = {}; // { Jorts: 'Afternoon', }

function addUser(sid, username) {
    sessions[sid] = username;
}

function addUserData(username, word) {
    userData[username] = word;
};

const database = {
    sessions,
    userData,
    addUser,
    addUserData,
};
module.exports = database;
const uuid = require('uuid').v4;

const messages = {};

function addMessage(username, text) {
    const id = uuid();
    const timestamp = new Date().toUTCString();
    messages[id] = { id, username, text, timestamp };
}

// all Messages {}
function getMessages() {
    return Object.values(messages);
}

function getMessageById(id) {
    return messages[id];
}

function updateMessage(id, { text }) {
    if (messages[id]) {
        messages[id].text = text;
        messages[id].timestamp = new Date().toUTCString();
        return true;
    }
    return false;
}

function deleteMessage(id) {
    if (messages[id]) {
        delete messages[id];
        return true;
    }
    return false;
}

module.exports = {
    addMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
};
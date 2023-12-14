import { fetchLogin, fetchSession, fetchLogout, fetchMessages, sendMessage, fetchUpdateMessage, fetchDeleteMessages, fetchLoggedInUsers } from './services';

const appEl = document.querySelector('#app');

let currentUser = null;
let messages = [];
let loggedInUsers = [];
let pollingInterval = null;

function renderLogin() {
    appEl.innerHTML = `
        <div class="login">
            <h1 class="login-header">Welcome to Chat App !</h1>
            <span class="login-subtitle">Please Login first</span>
            <input class="login-input" type="text" id="username" placeholder="Enter username" />
            <button id="loginButton" type="button">Login</button>
        </div>
        <div id="error-message" class="error-message"></div>
    `;
    document.querySelector('#loginButton').addEventListener('click', handleLogin);
}

function renderChat() {
    const messagesHtml = messages.map(message => {
        const formattedTime = new Date(message.timestamp).toLocaleString();
        return `<li>${message.username}: ${message.text} <span class="timestamp">(${formattedTime})</span></li>`;
    }).join('');

    const usersHtml = loggedInUsers.map(user => `<li>${user}</li>`).join('');

    appEl.innerHTML = `
        <div class="chat">
            <h1 class="chat-header">Welcome to Chat: ${currentUser}</h1>
            <div class="chat-users">
                <h2>Logged In Users:</h2>
                <ul class="chat-users-list">${usersHtml}</ul>
            </div>
            <div class="chat-messages">
                <h2>Message List:</h2>    
                <ul class="chat-messages-list">${messagesHtml}</ul>
                <div class="input-container">
                    <input class="message-input" id="message-text" />
                    <button id="sendMessageButton" type="button">Send</button>
                </div>
                <button id="logoutButton" type="button">Logout</button>
            </div>
            <div id="error-message" class="error-message"></div>
        </div>
    `;
    document.querySelector('#sendMessageButton').addEventListener('click', handleSendMessage);
    document.querySelector('#logoutButton').addEventListener('click', handleLogout);
}

function updateChatContent() {
    const messageInput = document.querySelector('#message-text');
    if (messageInput && document.activeElement === messageInput) {
        return;
    }

    document.body.classList.add('is-loading');
    const chatMessagesEl = document.querySelector('.chat-messages-list');
    const currentScrollPos = chatMessagesEl.scrollTop; // Save current scroll position

    fetchMessages().then(fetchedMessages => {
        messages = fetchedMessages;
        const messagesHtml = messages.map(message => {
            const formattedTime = new Date(message.timestamp).toLocaleString();
            return `<li>${message.username}: ${message.text} <span class="timestamp">(${formattedTime})</span></li>`;
        }).join('');
        chatMessagesEl.innerHTML = messagesHtml;
        chatMessagesEl.scrollTop = currentScrollPos; // Restore scroll position
    });

    fetchLoggedInUsers().then(users => {
        const html = users.map(user => `<li>${user}</li>`).join('');
        document.querySelector('.chat-users-list').innerHTML = html;
    }).catch(err => {
        console.error(err);
        displayError(err.error || 'default');
    }).finally(() => {
        document.body.classList.remove('is-loading');
    });
}

function startPolling() {
    pollingInterval = setInterval(updateChatContent, 5000);
}

function stopPolling() {
    if (pollingInterval) {
        clearInterval(pollingInterval);
    }
}

function handleLogin() {
    document.body.classList.add('is-loading');
    const username = document.querySelector('#username').value;
    fetchLogin(username)
        .then(() => {
            document.body.classList.remove('is-loading');
            currentUser = username;
            loggedInUsers.push(username);
            renderChat();
            startPolling();
        })
        .catch(err => {
            document.body.classList.remove('is-loading');
            console.error(err);
            displayError(err.error || 'default');
        });
}

function handleSendMessage() {
    const text = document.querySelector('#message-text').value;
    sendMessage(text)
        .then(() => {
            document.querySelector('#message-text').value = '';
            updateChatContent();
        })
        .catch(err => {
            console.error(err);
            displayError(err.error || 'default');
        });
}

function handleLogout() {
    fetchLogout()
        .then(() => {
            currentUser = null;
            loggedInUsers = [];
            stopPolling();
            renderLogin();
        })
        .catch(err => {
            console.error(err);
            displayError(err.error || 'default');
        });
}

const ERROR_MESSAGES = {
    'network-error': 'Unable to connect. Please check your network and try again.',
    'auth-required': 'You must be logged in to continue.',
    'auth-missing': 'Login session missing or expired. Please log in again.',
    'auth-insufficient': 'Access denied. You do not have sufficient privileges.',
    'required-username': 'Username is required and cannot be empty.',
    'message-not-found': 'The requested message was not found.',
    'invalid-message': 'Invalid message content.',
    'default': 'An unknown error occurred. Please try again.',
};

function displayError(messageKey) {
    const errorMessage = ERROR_MESSAGES[messageKey] || ERROR_MESSAGES['default'];
    const errorEl = document.querySelector('#error-message');
    if (errorEl) {
        errorEl.textContent = errorMessage;
    }
}


// Initialization
document.body.classList.add('is-loading');
fetchSession()
    .then(session => {
        document.body.classList.remove('is-loading');
        if (session.username) {
            currentUser = session.username;;
            renderChat();
            startPolling();
        } else {
            renderLogin();
        }
    })
    .catch(err => {
        document.body.classList.remove('is-loading');
        console.error(err);
        displayError(err.error || 'default');
        renderLogin();
    });
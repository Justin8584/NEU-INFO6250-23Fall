import { fetchLogin, checkSession, fetchLogout, getStoredWord, updateStoredWord } from "./services";

const state = {
    username: null,
    storedWord: null,
    error: null,
}

function render() {
    const app = document.getElementById('app');

    const wordView =
        `<div class="word__view">
            <h1 class="word__title">Welcome, ${state.username}</h1>
            <button class="logout-button" id="logout-button" type="button">Logout</button>
            <p class="word__show">${state.storedWord ? `Your Stored Word:<span class="word__word">${state.storedWord}</span>` : 'No Word is stored. Please add one.'}</p>
            <form class="word__form" id="word__form">
                <label class="word__label" for="word">Enter Word:</label>
                <input class="word__input" id="word" type="text" value="" />
                <button type="submit">Update</button>
            </form>
            ${state.error ? `<p class="error">${state.error}</p>` : ''}
            
        </div>`;

    const loginHTML =
        `<div class="login__page">
            <h1 class="login__title">Please Enter your Username to Login</h1>
            <form class="login__form" id="login__form">
                <label class="login__form-label" for="username">Username:</label>
                <input class="login__form-input" id="username" type="text" required/>
                <button class="login__form-button" type="submit">Login</button>
            </form>
            ${state.error ? `<p class="error">${state.error}</p>` : ''}
        </div>`;

    if (state.username) {
        app.innerHTML = wordView;
        document.getElementById('word__form').addEventListener('submit', handleUpdate);
        document.getElementById('logout-button').addEventListener('click', handleLogout);
    } else {
        app.innerHTML = loginHTML;
        document.getElementById('login__form').addEventListener('submit', handleLogin);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    fetchLogin(username)
        .then(userINFO => {
            state.username = userINFO.username;
            state.error = null;
            return getStoredWord();
        }).then(word => {
            state.storedWord = word.storedWord;
            render();
        }).catch(err => {
            state.error = err.error || 'unknown-error';
            render();
        });
}

function handleLogout() {
    fetchLogout()
        .then(() => {
            state.username = null;
            state.storedWord = null;
            state.error = null;
            render();
        }).catch(err => {
            state.error = err.error || 'unknown-error';
            render();
        });
}

function handleUpdate(e) {
    e.preventDefault();
    const word = document.getElementById("word").value;
    updateStoredWord(word)
        .then(word => {
            state.storedWord = word.storedWord;
            state.error = null;
            render();
        })
        .catch(err => {
            state.error = err.error || "unknown-error";
            render();
        });
}

function getStart() {
    checkSession()
        .then(userINFO => {
            state.username = userINFO.username;
            state.error = null;
            return getStoredWord();
        })
        .then(word => {
            state.word = word.storedWord;
            render();
        })
        .catch(() => {
            render();
        });
}

getStart();
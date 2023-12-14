const words = require("./words");
const db = require("./database")
const webpages = {

    handleLogin: function () {

        return (
            `<html>
            <head>
                <title>INFO6250 - Project 1 Word Guess Game</title>
                <link rel="stylesheet" href="/css/styles.css" />
            </head>
            <body>
                <div class="container">
                    
                    <h1 class="page__title">Hi, there ~ </h1>
                    <h2 class="page__subtitle">Welcome to the Word Guess Game.</h2>

                    <div class="login">
                        <p class="login-title">Please Login First, </p>
                        <form class="login__form" action="/login" method="POST">
                            <label class="login__form-label" for="username">Username:</label>
                            <input class="login__form-input" type="text" name="username" id="username" placeholder=" Letters & Num Only"/>
                            <button class="login__form-button" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </body>
        </html>`
        );
    },

    homePage: function (sid) {
        const username = db.getSession(sid);
        const player = db.getPlayer(username);
        return (
            `<html>
            <head>
                <title>INFO6250 - Project 1 Word Guess Game</title>
                <link rel="stylesheet" href="/css/styles.css" />
            </head>
            <body>
                <div class="container">
                    
                    <h1 class="page__title">Hi, ${username} ~</h1>
                    <h2 class="page__subtitle">Welcome to the Word Guess Game.</h2>
                    
                    <div class="words">
                        <p class="words__list-title">Below is words List. Please choose one to guess.</p>
                        ${words.map((word) => `<span class="words__list-content">${word}</span>`).join("  ")}

                        <p class="words__input-title">Here is the Words you choose so far: </p>
                        ${player.guesses.map((guess) => `<span class="words__input-content">${guess}</span>`).join(" \n ")}
                    </div>

                    <div class="guess">
                        <span class="guess__title">Total Num of Guess:</span>
                        ${player.validGuessCount + player.invalidGuessCount}
                    </div>

                    <div class="guess">
                        ${webpages.handleGuess(sid)}
                    </div>
                    
                    <div class="messages">
                        <span class="messages__title">Message List:</span>
                        ${player.messages.map((message) => `<p class="messages__content">${message}</p>`).join("\n")}
                    </div>

                    ${webpages.handleNewGame()}

                    ${webpages.handleLogout()}
                </div>
            </body>
        </html>`);
    },

    handleGuess: function (sid) {

        const username = db.getSession(sid);
        const player = db.getPlayer(username);

        if (player.hasWon === true) {
            return (`<p class="game-win">Congratulations! You guessed the Correct secret word!</p>`)

        } else if (player.hasEnded === true) {
            return (`<p class="game-over">Game Over! You have exhausted all your chance. Please Start a New Game.</p>`)

        } else {
            return (
                `<form class="guess__form" action="/guess" method="POST">
                    <label class="guess__form-label" for="guess">Enter your guessing:</label>
                        <input class="guess__form-input" type="text" name="guess" id="guess" value="" placeholder="Letter only" />
                    <button class="guess__form-button" type="submit">Guess</button>
                </form>`)
        }
    },

    handleNewGame: function () {
        return (
            `<div class="newgame">
                <form class="newgame-form" action="/new-game" method="POST">
                    <button class="newgame-button" type="submit">Start New Game</button>
                </form>
            </div>`);
    },

    handleLogout: function () {
        return (
            `<div class="logout">
                <form class="logout__form" action="/logout" method="POST">
                    <button class="logout__button" type="submit">Logout</button>
                </form>
            </div>`);
    }
};
module.exports = webpages;
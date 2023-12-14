const express = require("express");
const cookieParser = require("cookie-parser");
const uuidv4 = require("uuid").v4;

const app = express();
app.use(express.static("./public"));

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Modal & View
const webpages = require("./webpages");
const db = require("./database");
const gm = require("./gameManager");


// HomePage or Word Page
app.get("/", (req, res) => {

    const sid = req.cookies.sid;
    if (sid && db.sessions[sid]) {
        return res.redirect("/homePage");
    } else {
        res.send(webpages.handleLogin());
    }
});

// handle Login - POST login from
app.post("/login", (req, res) => {

    const username = req.body.username;

    // Login username Validation
    if (!username || username === "dog" || /[^a-zA-Z0-9]/.test(username)) {
        return res.status(401).send(`Invalid Username. Please try again <a href="/">Here</a>`);
    }

    const sid = uuidv4();
    db.createSession(sid, username);

    if (!db.getPlayer(username)) {
        const newGamePhase = gm.createNewGame();
        db.createPlayer(username, newGamePhase);
    }

    const secretWord = db.getPlayer(username).secretWord;
    console.log(`\nNew game started for ${username}. Secret word: ${secretWord}`);

    res.cookie("sid", sid);
    res.redirect("/homePage");
});

// home page, show already saved guess word,
app.get("/homePage", (req, res) => {

    const sid = req.cookies.sid;

    // authentication, if not pass, redirect to login page
    if (!sid || !db.sessions[sid]) {
        return res.redirect("/");
    }
    res.send(webpages.homePage(sid));
})

// start a new game - POST new game form
app.post("/new-game", (req, res) => {

    const sid = req.cookies.sid;
    const username = db.getSession(sid);

    if (!username) {
        res.redirect("/");
    };
    const newGamePhase = gm.createNewGame();
    db.deletePlayer(username);
    db.updatePlayer(username, newGamePhase);

    const secretWord = db.getPlayer(username).secretWord;
    console.log(`\nNew game started for ${username}. Secret word: ${secretWord}`);

    res.redirect("/");
});

// making a guess - POST
app.post("/guess", (req, res) => {

    const sid = req.cookies.sid;
    const guessWord = req.body.guess.toLowerCase();
    const username = db.getSession(sid);
    const gamePhase = db.getPlayer(username);

    // authentication, if not pass, redirect to login page
    if (!sid || !username) {
        return res.redirect("/");
    }

    gm.updatePlayerGuess(gamePhase, guessWord);
    db.updatePlayer(username, gamePhase);
    res.redirect("/");
});

//handle logout - POST logout form
app.post("/logout", (req, res) => {

    const sid = req.cookies.sid;
    if (sid) {
        delete db.deleteSession(sid);
    }
    res.clearCookie('sid');
    res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://127.0.0.1:${PORT}`);
});
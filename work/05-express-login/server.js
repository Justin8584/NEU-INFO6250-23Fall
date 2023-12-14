const express = require('express');
const cookieParser = require('cookie-parser');
const uuidv4 = require("uuid").v4;

const app = express();
app.use(express.static("./public"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const webpages = require('./webpages');
const database = require('./database');

// login form or user data
app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if (sid && database.sessions[sid]) {
        return res.redirect('/data');
    } else {
        res.send(webpages.loginPage());
    }
});

// login POST request
app.post('/login', (req, res) => {
    const username = req.body.username;

    // Validate username
    if (!username || username === 'dog' || /[^a-zA-Z0-9]/.test(username)) {
        return res.status(401).send(`
            Invalid username. <a href="/">Please Try Again</a>
        `);
    }

    const sid = uuidv4();
    database.addUser(sid, username);
    res.cookie('sid', sid);
    res.redirect('/data');

    console.log("\n1 - login");
    console.log(database.sessions);
    console.log(database.userData);

});

// Serve the data page for logged-in users
app.get('/data', (req, res) => {

    const sid = req.cookies.sid;
    // Redirect to login if not authenticated
    if (!sid || !database.sessions[sid]) {
        return res.redirect('/');
    }
    res.send(webpages.dataPage(sid));
});

// update the word
app.post('/update-word', (req, res) => {

    const sid = req.cookies.sid;
    // Redirect to login if not authenticated
    if (!sid || !database.sessions[sid]) {
        return res.redirect('/');
    }

    const username = database.sessions[sid];
    const word = req.body.word;
    database.addUserData(username, word);
    res.redirect('/data');

    console.log("\n2 - update word");
    console.log(database.sessions);
    console.log(database.userData);
});

// logout
app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    if (sid) {
        delete database.sessions[sid];
    }
    res.clearCookie('sid');  // clear cookies
    res.redirect('/');  // back to login

    console.log("\n3 - logout");
    console.log(database.sessions);
    console.log(database.userData);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

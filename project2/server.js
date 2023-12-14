const express = require("express");
const cookieParser = require("cookie-parser")

const app = express();
const PORT = 3000;

app.use(express.static("./public"));
app.use(express.json());
app.use(cookieParser());

// sessions
const sessions = require('./sessions');
// users
const users = require('./users');
// messages
const messages = require('./messages');

// Create new session
app.post("/api/v1/session", (req, res) => {
    const username = req.body.username;
    if (username === "dog") {
        res.status(403).send({ error: "auth-insufficient" });
        return;
    }
    if (!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    const sid = sessions.addSession(username);
    res.cookie('sid', sid, { httpOnly: true, sameSite: 'lax' });
    res.status(200).json({ sid, username });

    // TODO: show existing User message
});

// Get existing session
app.get("/api/v1/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: "auth-missing" });
        return;
    }
    res.json({ sid, username });
});

// Delete session, Logout
app.delete("/api/v1/session", (req, res) => {
    const sid = req.cookies.sid;
    if (sid) {
        res.clearCookie("sid");
        sessions.deleteSession(sid);
        res.status(200).json({ message: "Logged out successfully!" });
    } else {
        res.status(401).json({ message: "No Session Found." });
    }
});

// Fetch all messages
app.get("/api/v1/message", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !sessions.getSessionUser(sid)) {
        res.status(401).json({ error: "auth-required" });
        return;
    }
    res.json(messages.getMessages());
});

// Fetch specific message by id
app.get("/api/v1/message/:id", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !sessions.getSessionUser(sid)) {
        res.status(401).json({ error: "auth-required" });
        return;
    }
    const id = req.params.id;
    const message = messages.getMessageById(id);
    if (message) {
        res.json(message);
    } else {
        res.status(404).json({ error: "message-not-found" });
    }
});

// Add new message
app.post("/api/v1/message", (req, res) => {
    try {
        const sid = req.cookies.sid;
        const username = sessions.getSessionUser(sid);
        if (!sid || !username) {
            res.status(401).json({ error: "auth-missing" });
            return;
        }
        const text = req.body.text;
        if (typeof text !== 'string' || text.trim() === '') {
            res.status(400).json({ error: "invalid-message" });
            return;
        }
        messages.addMessage(username, text);
        res.status(201).json({ message: "Message added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal-server-error" });
    }
});

// Update message (full replacement)
app.put("/api/v1/message/:id", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).json({ error: "auth-required" });
        return;
    }
    const id = req.params.id;
    const text = req.body.text;
    if (messages.updateMessage(id, { text })) {
        res.status(200).json({ message: "Message updated successfully" });
    } else {
        res.status(404).json({ error: "required-message" });
    }
});

// Partial update of a message
app.patch("/api/v1/message/:id", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).json({ error: "auth-required" });
        return;
    }
    const id = req.params.id;
    if (!messages.getMessageById(id)) {
        res.status(404).json({ error: "message-not-found" });
        return;
    }
    const text = req.body.text;
    messages.updateMessage(id, { text });
    res.status(200).json({ message: "Message updated successfully" });
});

// Delete message
app.delete("/api/v1/message/:id", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !sessions.getSessionUser(sid)) {
        res.status(401).json({ error: "auth-required" });
        return;
    }
    const id = req.params.id;
    if (messages.deleteMessage(id)) {
        res.status(200).json({ message: "Message deleted successfully" });
    } else {
        res.status(404).json({ error: "message-not-found" });
    }
});

// login users
app.get("/api/v1/users", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).json({ error: "auth-required" });
        return;
    }
    users.addUserData(username);

    res.json(users.getLoggedInUsers());
})


app.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));
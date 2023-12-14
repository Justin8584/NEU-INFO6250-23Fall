const express = require("express");
const app = express();
const PORT = 3000;

const chat = require("./chat"); // Model (Data)
const chatWeb = require("./chat-web"); // View (Appearance)

app.use(express.static("./public")); // Static Page, (for chat.css)

app.get("/", (req, res) => {
    res.send(chatWeb.chatPage(chat));
});


app.post("/chat",
    express.urlencoded({ extended: false }),
    (req, res) => {
        const { username, text } = req.body;
        chat.addMessage({ sender: username, text });

        res.redirect("/");
    });

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

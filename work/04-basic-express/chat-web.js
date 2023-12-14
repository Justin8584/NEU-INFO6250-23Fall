// View
const chatWeb = {
    chatPage: function (chat) {

        return (`
        <!doctype html>
        <html>
            <head>
                <title>Chat</title>
                <link rel="stylesheet" href="/chat.css" />
            </head>
            <body>
                <div class="chat-app" id="chat-app">
                    ${chatWeb.getUserList(chat)}
                    ${chatWeb.getMessageList(chat)}
                    ${chatWeb.getOutgoing(chat)}
                </div>
            </body>
        </html>
        `);
    },

    getMessageList: function (chat) {

        return (`<ol class="messages">` +
            Object.values(chat.messages).map((message) => (
                `<li>
                    <div class="message">
                        <div class="sender-info">
                            <img class="sender-avatar" alt="${message.sender} avatar"  src="${message.img}" />
                            <span class="username">${message.sender}</span>
                        </div>
                        <p class="message-text">${message.text}</p>
                    </div>
                </li>`)).join("") +

            `</ol>`);
    },

    getUserList: function (chat) {

        return (
            `<ul class="users">` +
            Object.values(chat.users).map((user) =>
                `<li>
                    <div class="user">
                        <span class="username">${user}</span>
                    </div>
                </li>`).join("") + `</ul>`
        );
    },

    getOutgoing: function () {

        return (
            `<div class="outgoing">
            <form class="form" action="/chat" method="POST">
                <!-- <label class="form__label"> -->
                    <!-- Username: -->
                    <input class="to-send" id="name" name="username" type="hidden" value="Jorts" placeholder="Enter Your Username" />
                <!-- </label> -->
                <label class="form__label">
                    New Message:
                    <input class="to-send" name="text" type="text" value="" placeholder="Enter Your Message" />
                </label>
                <button class="form-button" type="submit">Send</button>
            </form>
            </div>`
        );
    },
};
module.exports = chatWeb;

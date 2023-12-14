const database = require("./database");
const webpages = {

    loginPage: function () {

        return (`
            <html>
            <head>
                <title>User Data Page</title>
                <link rel="stylesheet" href="/css/styles.css" />
            </head>
            <body>
                <div class="container">
                    <h1>Please Login Here</h1>
                    <form action="/login" method="POST">
                        <input type="text" name="username" placeholder="Enter username">
                        <button type="submit">Login</button>
                    </form>
                </div>
            </body>
        </html>
        `);
    },

    dataPage: function (sid) {
        const username = database.sessions[sid];
        const word = database.userData[username] || '';
        return (`
            <html>
            <head>
                <title>User Data Page</title>
                <link rel="stylesheet" href="/css/styles.css" />
            </head>
            <body>
                <div class="container">
                    <h1>Welcome, ${username}</h1>
                    <p>Already Stored Word: ${word}</p>
                    <form action="/update-word" method="POST">
                        <input type="text" name="word" placeholder="Enter New Word">
                        <button type="submit">Update Word</button>
                    </form>
                    ${webpages.logoutPage()}
                </div>
            </body>
        </html>
        `);
    },

    logoutPage: function () {
        return (`
            <form action="/logout" method="POST">
                <button type="submit">Logout</button>
            </form>
        `);
    }
};
module.exports = webpages;
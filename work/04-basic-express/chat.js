// Model (data)

const users = { // users in Object
    "Amit": "Amit",
    "Bao": "Bao",
};

// messages is array, including Objects
const messages = [
    {
        sender: "Amit",
        text: "You up?",
        img: "http://placekitten.com/50/50?image=1",
    },
    {
        sender: "Bao",
        text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
        img: "http://placekitten.com/50/50?image=2",
    }
];

// Below uses Destructuring
function addMessage({ sender, text }) { // Leave this as `sender` - I want to see you solve the name disagreement

    messages.push({ sender, text, img: "http://placekitten.com/50/50?image=3", }); // Add avatar for Jorts(hard coding)
    users[sender] = sender;
}

const chat = {
    users,
    messages,
    addMessage,
};

module.exports = chat;


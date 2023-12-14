import Game from "./components/Game";
import Login from "./components/Login";

import { useState } from "react";
import "./App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    function onLogin(username) {
        setUsername(username);
        setIsLoggedIn(true);
    }

    function onLogout() {
        setIsLoggedIn(false);
    }

    return (
        <div className="app">
            {isLoggedIn ? (
                <Game username={username} onLogout={onLogout} />
            ) : (
                <Login onLogin={onLogin} />
            )}
        </div>
    );
}

export default App;

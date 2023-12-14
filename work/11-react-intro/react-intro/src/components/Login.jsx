import { isUsernameValid } from "../compares";
import "./Login.css";
import { useState } from "react";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    function handleLogin(e) {
        e.preventDefault();
        setUsername("");

        if (!username) {
            setMessage("Error: Username CANNOT be Empty.");
        } else if (username == "dog") {
            setMessage(`Error: ${username} is NOT a valid username.`);
        } else if (isUsernameValid(username)) {
            setMessage(`Error: ${username} has NOT allowed characters. Try Again!`);
        } else {
            setMessage("Login Success");
            onLogin(username);
        }
    }

    return (
        <form className="login-form">
            <label className="login-label">
                <span className="form-title">Username:</span>
                <input
                    className="form-input"
                    value={username}
                    onInput={(e) => {
                        setUsername(e.target.value);
                    }}
                />
            </label>

            <button className="login-button" type="submit" onClick={handleLogin}>
                Login
            </button>

            <p className="login-message">{message}</p>
        </form>
    );
}

export default Login;

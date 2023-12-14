import { useState } from "react";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");

    function onChange(e) {
        setUsername(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        setUsername("");

        if (username.trim()) {
            onLogin(username.trim());
        }
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={onSubmit}>
                <label>
                    <h1>Welcome to Blog Post</h1>
                    <span>Username:</span>
                    <input className="login__username" value={username} onChange={onChange} />
                </label>
                <button className="login__button" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;

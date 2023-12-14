import "./Game.css";
import { isGuessCorrect, countMatchingLetters } from "../compares";

import { useState } from "react";

function Game({ username, onLogout }) {
    const [guessWord, setGuessWord] = useState(""); // inProgress
    const [lastGuess, setLastGuess] = useState(""); // saved
    const [message, setMessage] = useState("");

    const secret = "RECAT";

    function handleSubmit(e) {
        e.preventDefault();
        const trimGuess = guessWord.trim();
        setLastGuess(trimGuess);
        setGuessWord("");

        if (trimGuess == "") {
            setMessage(`Error: Guess cannot be blank.`);
        } else if (trimGuess.length !== 5) {
            setMessage(`Error: "${trimGuess}" was not a valid word.`);
        } else if (isGuessCorrect(secret, trimGuess)) {
            setMessage(`Congratulation! "${trimGuess}" is the Correct secret word!`);
        } else {
            const matchingLetters = countMatchingLetters(secret, trimGuess);
            setMessage(`Wrong Guess | "${trimGuess}" had ${matchingLetters} letters in common.`);
        }
    }

    return (
        <div className="game">
            <h1 className="game-title">Welcome, {username}</h1>
            <p className="game-instruction">Please choose a 5-letter Word to get started.</p>
            <form className="game-form" onSubmit={handleSubmit}>
                <label className="form-label">
                    <span className="form-title">Make a Guess:</span>
                    <input
                        className="form-input"
                        value={guessWord}
                        onInput={(e) => setGuessWord(e.target.value)}
                    />
                </label>

                <button className="form-button" type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>

            <p className="game-message">{message}</p>

            <p className="game-record">{lastGuess ? `Last Guess: ${lastGuess}` : ""}</p>

            <button className="game-logout" type="button" onClick={onLogout}>
                Logout
            </button>
        </div>
    );
}
export default Game;

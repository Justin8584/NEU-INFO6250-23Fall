const words = require("./words");

function pickSecretWord() {
    const index = Math.floor(Math.random() * words.length);
    return words[index].toLowerCase();
};

function countMatchingLetters(secret, guess) {

    function createWordDict(word) {

        word = word.toLowerCase();
        const wordDict = {};
        for (let letter of word) {
            wordDict[letter] = (wordDict[letter] || 0) + 1;
        }
        return wordDict;
    }

    const secretDict = createWordDict(secret);
    const guessDict = createWordDict(guess);

    let cot = 0;
    for (let key of Object.keys(secretDict)) {
        if (guessDict[key]) {
            cot += secretDict[key] < guessDict[key] ? secretDict[key] : guessDict[key]
        }
    }
    return cot;
};

function isValidGuess(player, guessWord) {
    if (player.guesses.includes(guessWord) || !words.includes(guessWord) || /[^a-zA-Z]/.test(guessWord)) {
        return false;
    }
    return true;
};

function isCorrectGuess(player, guessWord) {
    return guessWord === player.secretWord;
};

function hasGameEnded(player) {
    const totalGuesses = player.validGuessCount + player.invalidGuessCount;
    return totalGuesses >= 15;
};

function createNewGame() {

    const secretWord = pickSecretWord();
    return {
        secretWord: secretWord,
        guesses: [],
        validGuessCount: 0,
        invalidGuessCount: 0,
        messages: [],
        hasWon: false,
        hasEnded: false
    };
};

function updatePlayerGuess(player, guessWord) {

    if (player.hasWon || player.hasEnded) {
        player.messages.push(
            player.hasWon ?
                "Congratulations! You already Won, Please start new Game or Logout. " : "Game Over! You have exhausted all your chance.");
        return player;
    }

    if (!isValidGuess(player, guessWord)) {
        player.invalidGuessCount += 1;
        player.messages.push(`"${guessWord}" is not a valid guess.`);
    } else if (isCorrectGuess(player, guessWord)) {
        player.hasWon = true;
        // player.messages.push('Congratulations! You guessed the Correct secret word!');
    } else {
        const matchingLetters = countMatchingLetters(player.secretWord, guessWord);
        player.validGuessCount += 1;
        player.guesses.push(guessWord);
        player.messages.push(`"${guessWord}" has ${matchingLetters} matching letters.`);
    }

    if (hasGameEnded(player)) {
        player.hasEnded = true;
        // player.messages.push('Game Over! You have exhausted all your chance.');
    }
    return player;
};

module.exports = {
    createNewGame,
    updatePlayerGuess,
};




export function countMatchingLetters(secret, guess) {
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

    let count = 0;
    for (let key of Object.keys(secretDict)) {
        if (guessDict[key]) {
            count += secretDict[key] < guessDict[key] ? secretDict[key] : guessDict[key];
        }
    }
    return count;
}

export function isGuessCorrect(secret, guess) {
    return secret.toLowerCase() === guess.toLowerCase();
}

export function isUsernameValid(username) {
    return !/^[a-zA-Z0-9]+$/.test(username);
}

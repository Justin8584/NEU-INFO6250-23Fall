"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {
    // DO NOT MODIFY

    /* YOU MAY MODIFY THE LINES BELOW */

    function createMap(inputString) {
        inputString = inputString.toLowerCase();
        const stringMap = {};
        for (let char of inputString) {
            stringMap[char] = (stringMap[char] || 0) + 1;
        }
        return stringMap;
    }

    const wordMap = createMap(word);
    const guessMap = createMap(guess);

    let count = 0;
    for (let key of Object.keys(wordMap)) {
        if (guessMap[key]) {
            count += wordMap[key] < guessMap[key] ? wordMap[key] : guessMap[key];
        }
    }
    return count;
}

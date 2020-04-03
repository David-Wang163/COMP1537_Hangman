let myHangMan = new MyHangman("image/hang.png");
let countClick = 0;
let Attempt = 7;
let score = 0;
let btnArr = [];
let listOfWords = [];
createGuessWord();
let guessWord = randomWord();
let guessWordInUpperCase = guessWord.guessWord.toUpperCase();
let playerGuess = hiddenGuessWord();
/**
 * 
 * @param {string} color: color of the button
 * @param {string} letter: letter from A-Z thats appear on a button
 * The object constructor for button
 */
function Button(color, letter) {
    this.letterBtn = document.createElement("button");
    this.letterBtn.style.backgroundColor = color;
    this.letterBtn.innerHTML = letter;
    this.letterBtn.className = "myButtons";
    this.letterBtn.disabled = false;
    this.letterBtn.onclick = function () {
        checkLetter(letter)
    }
    document.getElementById("btns").appendChild(this.letterBtn);
}
/**
 * The function will generate 26 buttons, from button A-Z
 */
function createButtons() {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let colorArr = ['#00CED1', '#20B2AA', '#008080', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C', '#BDB76B',
        '#DDA0DD', '#EE82EE', '#DA70D6', '#FF00FF', '#BA55D3', '#9370DB', '#663399', '#8A2BE2', '#9400D3',
        '#8B008B', '#800080', '#4B0082', '#6A5ACD', '#483D8B', '#7B68EE', '#ADFF2F', '#7FFF00', '#7CFC00']

    for (let i = 0; i < 26; i++) {
        let btn = new Button(colorArr[i], alphabet[i]);
        btnArr.push(btn);
    }
}
/**
 * the function create 10 words with their definition using object constructor.
 */
function createGuessWord() {
    let wordList = ['committee', 'Tattoo', 'electricity', 'computer', 'InternetOfThings', 'OOP', 'teamwork', 'life', 'dog', 'cat'];
    let definition = ['a group of people appointed for a specific function, typically consisting of members of a larger group.',
        'a form of body modification where a design is made by inserting ink',
        'is the set of physical phenomena associated with the presence and motion of electric charge.',
        'an electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program.',
        'the interconnection via the Internet of computing devices embedded in everyday objects, enabling them to send and receive data.',
        ' a programming paradigm based on the concept of objects',
        'the combined action of a group of people, especially when effective and efficient.',
        'the condition that distinguishes animals and plants from inorganic matter.',
        'a domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, nonretractable claws, and a barking, howling, or whining voice.',
        'a small domesticated carnivorous mammal with soft fur, a short snout, and retractable claws.'];

    for (let i = 0; i < wordList.length; i++) {
        let word = new GuessWordAndDefinition(wordList[i], definition[i]);
        listOfWords.push(word);
    }
}
/**
 * the function will pick a random word and its definition from the list.
 */
function randomWord() {
    let randomIndex = Math.floor(Math.random() * listOfWords.length);
    let word = listOfWords[randomIndex];
    return word;
}
/**
 * 
 * @param {string} word: a word from the populated list
 * @param {string} definition: a definition comes with the word
 * The object constructor for each word and its definition
 */
function GuessWordAndDefinition(word, definition) {
    this.guessWord = word;
    this.wordDefinition = definition;
}
/**
 * 
 * @param {string} url: the source of image
 * The object constructor for hangman 
 */
function MyHangman(url) {
    this.hangMan = document.createElement("img");
    this.hangMan.className = "hangMan";
    this.changeStage = function (url) {
        this.hangMan.src = url;
    }
    this.changeStage(url);
    document.body.appendChild(this.hangMan);
}
/**
 * 
 * @param {string} buttonLetter
 * The function will check if a letter from the button that user clicked exists in the guess word. 
 */
function checkLetter(buttonLetter) {
    let wordDict = checkNumOfOccurrences();
    if (guessWordInUpperCase.indexOf(buttonLetter) > -1) {
        document.querySelector("#attempt").innerHTML = "Attempt: " + Attempt;
        score += wordDict[buttonLetter];
        document.querySelector("#score").innerHTML = "Score: " + score;
        displayPlayerGuess(buttonLetter);
        disableButton(buttonLetter);
    }
    else {
        countClick += 1;
        Attempt -= 1;
        document.querySelector("#attempt").innerHTML = "Attempt: " + Attempt;
        score -= 1;
        document.querySelector("#score").innerHTML = "Score: " + score;
        changeStageOfHangMan();
    }
}
/**
 * The function will change the url when the user picked the letter
 * that does not exist in the guess word.
 */
function changeStageOfHangMan() {
    if (countClick < 7) {
        myHangMan.changeStage("image/stage" + countClick + ".png");
    }
    else {
        myHangMan.changeStage("image/stage7.png");
        gameStatus()
    }
}
/**
 * The function will calculate how many times each letter appears in the guess word
 * Return an object with the key is each letter and the value is its frequency
 */
function checkNumOfOccurrences() {
    let wordFreqDict = {};
    for (let i = 0; i < guessWordInUpperCase.length; i++) {
        if (guessWordInUpperCase[i].toUpperCase() in wordFreqDict)
            wordFreqDict[guessWordInUpperCase[i]]++;
        else
            wordFreqDict[guessWordInUpperCase[i]] = 1;
    }
    return wordFreqDict;
}
/**
 * The function will be executed when the game ends
 */
function gameStatus() {
    let playerName = prompt("Please enter your name");
    document.getElementById("messageToPlayer").textContent = "GAME OVER!!!!!!" + playerName.charAt(0).toUpperCase() + playerName.slice(1) +
        ", your score: " + score + ". The word was " + guessWordInUpperCase;
    for (let i = 0; i < btnArr.length; i++) {
        btnArr[i].letterBtn.disabled = true;
    }
}
/**
 * The function will hide the guess word and display
 * the number of underscores corresponding with the length of the guess word
 */
function hiddenGuessWord() {
    let hiddenWord = [];
    for (let i = 0; i < guessWordInUpperCase.length; i++)
        hiddenWord.push("_");
    return hiddenWord;
}
/**
 * 
 * @param {string} playerGuessLetter
 * The function will overwrite the underscore with the correct letter
 * when the player guesses correctly 
 */
function displayPlayerGuess(playerGuessLetter) {
    let h2Tag = document.querySelector("h2");
    let splitGuessWord = guessWordInUpperCase.split("");

    for (let i = 0; i < playerGuess.length; i++) {
        if (guessWordInUpperCase.charAt(i) == playerGuessLetter) {
            playerGuess[i] = playerGuessLetter;
        }
    }
    h2Tag.innerHTML = playerGuess.join(" ");
    if (h2Tag.innerHTML === splitGuessWord.join(" ") && Attempt > 0) {
        document.querySelector("#messageToPlayer").innerHTML = "Congratulations!!! You win. Your score: " + score;
        for (let i = 0; i < btnArr.length; i++) {
            btnArr[i].letterBtn.disabled = true;
        }
    }
}
/**
 * 
 * @param {string} buttonLetter 
 * The function will disable the button (button is not clickable)
 * after the user guesses correct letter
 */
function disableButton(buttonLetter) {
    for (let i = 0; i < btnArr.length; i++) {
        if (btnArr[i].letterBtn.innerHTML === buttonLetter)
            btnArr[i].letterBtn.disabled = true;
    }
}
/**
 * The function will be executed when the user click on restart button
 */
function restart() {
    window.location.reload();
}
/**
 * The function will be executed when the user click on hint button
 */
function hint() {
    document.querySelector("#messageToPlayer").innerHTML = "Definition: " + guessWord.wordDefinition;
    document.querySelector("#hint").disabled = true;
}
createButtons();
document.querySelector("h2").innerHTML = hiddenGuessWord().join(" ");
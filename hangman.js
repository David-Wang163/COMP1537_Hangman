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
// object constructor
function Button(color, letter) {
    this.letterBtn = document.createElement("button");
    this.letterBtn.style.backgroundColor = color;
    this.letterBtn.innerHTML = letter;
    this.letterBtn.className = "myButtons";
    this.letterBtn.disabled = false;
    this.letterBtn.onclick = function () {
        checkLetter(letter)
    }
    document.body.appendChild(this.letterBtn);
}
function createButtons() {
    // all of the letters
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // color of buttons
    let colorArr = ['#00CED1', '#20B2AA', '#008080', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C', '#BDB76B',
        '#DDA0DD', '#EE82EE', '#DA70D6', '#FF00FF', '#BA55D3', '#9370DB', '#663399', '#8A2BE2', '#9400D3',
        '#8B008B', '#800080', '#4B0082', '#6A5ACD', '#483D8B', '#7B68EE', '#ADFF2F', '#7FFF00', '#7CFC00']

    for (let i = 0; i < 26; i++) {
        let btn = new Button(colorArr[i], alphabet[i]);
        btnArr.push(btn);
    }
}
// create randomWord
function createGuessWord() {
    let wordList = ['committee', 'Tattoo', 'electricity', 'computer', 'InternetOfThings', 'OOP', 'teamwork', 'life', 'dog', 'cat'];
    let definition = ['a group of people appointed for a specific function, typically consisting of members of a larger group.',
        'a form of body modification where a design is made by inserting ink',
        'is the set of physical phenomena associated with the presence and motion of electric charge.',
        'an electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program.',
        'the interconnection via the Internet of computing devices embedded in everyday objects, enabling them to send and receive data.',
        ' a programming paradigm based on the concept of objects',
        'the combined action of a group of people, especially when effective and efficient.',
        'the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death.',
        'a domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, nonretractable claws, and a barking, howling, or whining voice.',
        'a small domesticated carnivorous mammal with soft fur, a short snout, and retractable claws. It is widely kept as a pet or for catching mice, and many breeds have been developed.'];

    for (let i = 0; i < wordList.length; i++) {
        let word = new GuessWordAndDefinition(wordList[i], definition[i]);
        listOfWords.push(word);
    }
}
function randomWord() {
    let randomIndex = Math.floor(Math.random() * listOfWords.length);
    let word = listOfWords[randomIndex];
    return word;
}
function GuessWordAndDefinition(word, definition) {
    this.guessWord = word;
    this.wordDefinition = definition;
}
// create hangman
function MyHangman(url) {
    this.hangMan = document.createElement("img");
    this.hangMan.className = "hangMan";
    this.changeStage = function (url) {
        this.hangMan.src = url;
    }
    this.changeStage(url);
    document.body.appendChild(this.hangMan);
}
// function to check if player guesses correct letter in randomWord
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
        changeStageOfHangMan();
        Attempt -= 1;
        document.querySelector("#attempt").innerHTML = "Attempt: " + Attempt;
        score -= 1;
        document.querySelector("#score").innerHTML = "Score: " + score;
    }
}
// if players does not get the word correct
function changeStageOfHangMan() {
    if (countClick < 7) {
        myHangMan.changeStage("image/stage" + countClick + ".png");
    }
    else {
        myHangMan.changeStage("image/stage7.png");
        gameStatus()
    }
}
// check word frequency
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

function gameStatus() {
    document.getElementById("messageToPlayer").textContent = "You Lose! the word was " + guessWordInUpperCase;
    for (let i = 0; i < btnArr.length; i++) {
        btnArr[i].letterBtn.disabled = true;
    }
}

function hiddenGuessWord() {
    let hiddenWord = [];
    for (let i = 0; i < guessWordInUpperCase.length; i++)
        hiddenWord.push("_");
    return hiddenWord;
}

function displayPlayerGuess(playerGuessLetter) {
    let h2Tag = document.querySelector("h2");
    let splitGuessWord = guessWordInUpperCase.split("");

    for (let i = 0; i < playerGuess.length; i++) {
        if (guessWordInUpperCase.charAt(i) == playerGuessLetter) {
            playerGuess[i] = playerGuessLetter;
        }
    }
    h2Tag.innerHTML = playerGuess.join(" ");
    if (h2Tag.innerHTML === splitGuessWord.join(" ") && Attempt > 0)
        document.querySelector("#messageToPlayer").innerHTML = "Congratulations!!! You win";
}
function disableButton(buttonLetter) {
    for (let i = 0; i < btnArr.length; i++) {
        if (btnArr[i].letterBtn.innerHTML === buttonLetter)
            btnArr[i].letterBtn.disabled = true;
    }
}

function restart() {
    window.location.reload();
}

function hint(){
    document.querySelector("#hintForPlayer").innerHTML = "Definition: " + guessWord.wordDefinition;
    document.querySelector("#hint").disabled = true;
}
createButtons();
document.querySelector("h2").innerHTML = hiddenGuessWord().join(" ");
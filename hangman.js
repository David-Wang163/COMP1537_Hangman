let guessWord = randomWord();
let splitGuessWord = guessWord.split("");
let playerGuess = hiddenGuessWord();
let myHangMan = new MyHangman("image/hang.png");
let countClick = 0;
let Attempt = 7;
let btnArr = [];
let score = 0;
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
    document.getElementById("btns").appendChild(this.letterBtn);
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
function randomWord() {
    let wordList = ['George', 'David', 'Xavier', 'Saida'];
    let randomIndex = Math.floor(Math.random() * wordList.length);
    let word = wordList[randomIndex].toUpperCase();
    return word
}
// create hangman
function MyHangman(url) {
    this.hangMan = document.createElement("img");
    this.hangMan.className = "hangMan";
    this.changeStage = function (url) {
        this.hangMan.src = url;
    }
    this.changeStage(url);
    document.getElementById("imgs").appendChild(this.hangMan);
}
// function to check if player guesses correct letter in randomWord
function checkLetter(buttonLetter) {
    if (guessWord.indexOf(buttonLetter) > -1) {
        let wordDict = checkNumOfOccurrences();
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
    for (let i = 0; i < guessWord.length; i++) {
        if (guessWord[i] in wordFreqDict)
            wordFreqDict[guessWord[i]]++;
        else
            wordFreqDict[guessWord[i]] = 1;
    }
    return wordFreqDict;
}

function gameStatus() {
    document.getElementById("messageToPlayer").textContent = "You Lose! the word was " + guessWord
    for (let i = 0; i < btnArr.length; i++) {
        btnArr[i].letterBtn.disabled = true;
    }
}

function hiddenGuessWord() {
    let hiddenWord = [];
    for (let i = 0; i < guessWord.length; i++)
        hiddenWord.push("_");
    return hiddenWord;
}

function displayPlayerGuess(playerGuessLetter) {
    let h2Tag = document.querySelector("h2");
    for (let i = 0; i < playerGuess.length; i++) {
        // console.log(guessWord.charAt(i))
        if (guessWord.charAt(i) == playerGuessLetter) {
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
createButtons();
document.querySelector("h2").innerHTML = hiddenGuessWord().join(" ");
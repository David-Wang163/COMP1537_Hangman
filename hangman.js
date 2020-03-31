let guessWord = randomWord();
let playerGuess = hiddenGuessWord();
let myHangMan = new MyHangman("image/hang.png");
let countClick = 0;
let score = 0;
// object constructor
function Button(color, letter) {
    this.letterBtn = document.createElement("button");
    this.letterBtn.style.backgroundColor = color;
    this.letterBtn.innerHTML = letter;
    this.letterBtn.className = "myButtons";
    this.letterBtn.onclick = function () {
        checkLetter(letter);
        // numOfLetter = showNumOfLetters(letter);
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
    document.body.appendChild(this.hangMan);
}
// function to check if player guesses correct letter in randomWord
function checkLetter(buttonLetter) {
    if (guessWord.indexOf(buttonLetter) > -1) {
        let wordDict = checkNumOfOccurrences();
        // console.log(wordDict)
        score += wordDict[buttonLetter];
        document.querySelector("p").innerHTML = "Score: " + score;
        displayPlayerGuess(buttonLetter);
    }
    else {
        countClick += 1;
        changeStageOfHangMan();
        score -= 1;
        document.querySelector("p").innerHTML = "Score: " + score;
    }
}
// if players does not get the word correct
function changeStageOfHangMan() {
    if (countClick === 7) {
        myHangMan.changeStage("image/stage" + countClick + ".png");
        document.querySelector("result").innerHTML = "You lost";
    }
    else myHangMan.changeStage("image/stage" + countClick + ".png");
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
// find the position of letter in a guessWord
function showNumOfLetters(letter){
    let storeIndex = [];
    for (let i = 0; i < guessWord.length; i++){
        if(letter == guessWord[i])
            storeIndex.push(i);
    }
    return storeIndex;
}
// console.log(guessWord);

function hiddenGuessWord(){
    let hiddenWord = [];
    for (let i = 0; i < guessWord.length; i++)
        hiddenWord.push("_");
    return hiddenWord;
}

// function displayPlayerGuess(){
//     let hiddenWord = hiddenGuessWord();
//     for (let i = 0; i < numOfLetter.length; i++)
//         hiddenWord.replace(hiddenWord[numOfLetter[i]], guessWord[i]);
// }

function displayPlayerGuess(playerGuessLetter){
    // console.log(playerGuessLetter)
    // console.log(playerGuess)
    for (let i = 0; i < playerGuess.length; i++){
        console.log(guessWord.charAt(i))
        if (guessWord.charAt(i) == playerGuessLetter){
            playerGuess[i] = playerGuessLetter;
        }
    }
    // console.log(playerGuess)
    document.querySelector("h2").innerHTML = playerGuess.join(" ");
}

createButtons();
document.querySelector("h2").innerHTML = hiddenGuessWord().join(" ");

// function appendWord(word) {
//     for (i=0; i<word.length; i++) {
//         let miniBox = document.createElement("div")
//         document.getElementById("wordbox").appendChild(miniBox);
//         miniBox.append(word[i])
//         miniBox.style.borderBottom = "3px solid black"
//         miniBox.style.fontSize = "40px";
//         miniBox.style.textAlign = "center";
//         miniBox.style.width = "50px";
//         miniBox.style.height = "50px";
//         miniBox.style.float = "left";
//         miniBox.style.marginRight = "10px";
//         miniBox.className = word[i].toLowerCase();
//         miniBox.style.color = "white"
//     }
// }

// function changeColor(btn) {
//     let letter = btn.innerHTML.toLowerCase();
//     let words = document.getElementsByClassName(letter);
//     for (i=0; i<words.length; i++) {
//         words[i].style.color = "black";
//     }
// }

// appendWord(word);
// createButtons();

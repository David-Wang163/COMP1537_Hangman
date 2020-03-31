let guessWord = randomWord();
let myHangMan = new MyHangman("image/hang.png");
let countClick = 0;
// object constructor
function Button(color, letter) {
    this.letterBtn = document.createElement("button");
    this.letterBtn.style.backgroundColor = color;
    this.letterBtn.innerHTML = letter;
    this.letterBtn.className = "myButtons";
    this.letterBtn.onclick = function () {
        checkLetter(letter);
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

function randomWord() {
    let wordList = ['George', 'David', 'Xavier', 'Saida'];
    let randomIndex = Math.floor(Math.random() * wordList.length);
    let word = wordList[randomIndex].toUpperCase();
    return word
}
function Word(letter) {
    this.word = document.createElement("h2");
    this.word.innerHTML = letter;
    this.word.className = "guessWord"
    document.body.appendChild(this.word);
}
function displayWord() {
    let word = new Word(guessWord);
}
function MyHangman(url) {
    this.hangMan = document.createElement("img");
    this.hangMan.className = "hangMan";
    this.changeStage = function (url) {
        this.hangMan.src = url;
    }
    this.changeStage(url);
    document.body.appendChild(this.hangMan);
}
function checkLetter(buttonLetter) {
    if (guessWord.indexOf(buttonLetter) > -1)
        document.querySelector("result").innerHTML = buttonLetter;
    else {
        countClick += 1;
        changeStageOfHangMan();
    }
}
function changeStageOfHangMan() {
    if (countClick === 7) {
        myHangMan.changeStage("image/stage" + countClick + ".png");
        document.querySelector("result").innerHTML = "You lost";
    }
    else myHangMan.changeStage("image/stage" + countClick + ".png");
}
createButtons();
displayWord();


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

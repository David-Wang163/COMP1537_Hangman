const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let word = randomWord();

function createButtons() {
    for (i=0; i<26; i++) {
        let btn = document.createElement('button');
        document.getElementById("letters").appendChild(btn)
        btn.className = 'letters'
        btn.innerHTML = letters[i];
        btn.onclick = function () {changeColor(btn)}
    }
}

function randomWord() {
    let wordList = ['George', 'David', 'Xavier', 'Saida'];
    let randomIndex = Math.floor(Math.random() * wordList.length);
    let word = wordList[randomIndex];
    return word
}

function appendWord(word) {
    for (i=0; i<word.length; i++) {
        let miniBox = document.createElement("div")
        document.getElementById("wordbox").appendChild(miniBox);
        miniBox.style.borderBottom = "3px solid black"
        miniBox.style.fontSize = "40px";
        miniBox.style.textAlign = "center";
        miniBox.style.width = "50px";
        miniBox.style.height = "50px";
        miniBox.style.float = "left";
        miniBox.style.marginRight = "10px";
        miniBox.className = word[i].toLowerCase();
    }
}

function changeColor(btn) {
    let letter = btn.innerHTML.toLowerCase();
    let words = document.getElementsByClassName(letter);
    for (i=0; i<words.length; i++) {
        if (words[i].innerHTML == letter) {
            return
        }
        words[i].append(letter)
    }
}

appendWord(word);
createButtons();

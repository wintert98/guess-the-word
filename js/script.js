const guessed = document.querySelector(".guessed-letters");
const btnGuess = document.querySelector(".guess");
const form = document.querySelector(".guess-form");
const input = document.querySelector(".letter");
const wordInProgess = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainSpan = document.querySelector(".remain");
const message = document.querySelector(".message");
const btnPlayAgain = document.querySelector(".play-again");
let playerWon = false;
let word = "magnolia";
let wordUpCase = word.toUpperCase();
let guessedLetters = [];
guessed.innerHTML = "";
let remainingGuesses = 8;

/* -------- Async fetch word function -------------*/

const getWord = async function () {
    const res = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const data = await res.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length)
    const randomWord = wordArray[randomIndex];
    
    word = randomWord;
    console.log(word);
    updateText(word);
    wordUpCase = word.toUpperCase();
}
getWord();

/* -------- Updates Text of word to guess with circles -------------*/

const updateText = function (word) {
    const circle = "●";
     let wordArray = [];
     for (let i of word) {
       wordArray.push(circle)
     }
     let joined = wordArray.join(" ")
     wordInProgess.innerText = joined;
};

updateText(word);

/* -------- Listens to button clicks and checks letters entered -------------*/

btnGuess.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const checkedInput = checkInput(input.value);
    makeGuess(checkedInput);
    form.reset();
   
});

/* -------- Updates Text of word to guess with circles -------------*/

const checkInput = function (input) {
   const acceptedLetter = /[a-zA-Z]/
   if (!input.match(acceptedLetter)) {
       message.innerText = "Please enter only letters from a to z, and not a blank space."
   } else if (input.length > 1 ) {
    message.innerText = "Please enter only one letter"
   } else {
       return input
   } 
};

/* -------- Checks all letters guessed -------------*/
const makeGuess = function (letter) {
 const guess = letter.toUpperCase();
 if (guessedLetters.includes(guess)) {
     message.innerText = "Try again, you have already guessed that letter";
 } else {
     guessedLetters.push(guess);
     showGuess(guess);
     updateWordInProgress(guessedLetters);
     updateRemainingGuesses(guess);
 }
};

/* -------- Shows all letters guessed to DOM -------------*/
const showGuess = function (guess) {
  //guessed.innerHTML = "";
  let li = document.createElement("li");
  li.innerHTML = `<li> ${guess} </li>`
  guessed.append(li);
};

/* -------- Updates Text of word in progress to guess and removes circles of correctly guessed letters-------------*/

const updateWordInProgress = function (array) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  let newWordArray = [];
  for (let letter of wordArray) {
      if (array.includes(letter)) {
          newWordArray.push(letter);
      } else {
          newWordArray.push("●")
      }
  }
  let joined = newWordArray.join("")
  wordInProgess.innerText = joined;
  playerWin(joined)
};

/* -------- Updates remaining guesses function -------------*/
const updateRemainingGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
   if (!wordUpper.includes(guess)) {
       message.innerText = "The word does not include that letter, try again"
       remainingGuesses -= 1;
   } else if (playerWon) {
       message.innerHTML =  `<p class="highlight">You guessed correct the word! Congrats you win!</p>`
   } else if (wordUpper.includes(guess)) {
       message.innerText = "The word does include that letter, Nice Work!"
   } 
   if(remainingGuesses === 0) {
      message.innerText = `Game Over! the word you were trying to guess is ${wordUpper}, try again`
      startOver();
   }
   remainSpan.innerText = remainingGuesses + " guesses"
};

/* -------- Checks if player has won the game -------------*/
const playerWin = function (wordGuess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper === wordGuess) {
        message.classList.add("win")
        playerWon = true;
        startOver();
        

    } 

};

/* -------- Reset game and start over -------------*/

const startOver = function () {
   btnGuess.classList.add("hide");
   remaining.classList.add("hide");
   guessed.classList.add("hide")
   btnPlayAgain.classList.remove("hide")
};

const gameReset = function () {
    message.innerHTML = "";
    playerWon = false;
    message.classList.remove("win");
    message.classList.remove("highlight")
    remaining.classList.remove("hide");
    guessed.classList.remove("hide");
    guessed.innerHTML = "";
    remainingGuesses = 8;
    remainSpan.innerText = remainingGuesses + " guesses"
    btnGuess.classList.remove("hide");
    btnPlayAgain.classList.add("hide")
}

btnPlayAgain.addEventListener("click", function (e) {
      gameReset();
      guessedLetters = [];
      getWord();
});
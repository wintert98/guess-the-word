const guessed = document.querySelector(".guessed-letters");
const btnGuess = document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordInProgess = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainSpan = document.querySelector(".remain");
const message = document.querySelector(".message");
const btnPlayAgain = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

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

btnGuess.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(input.value);
    message.innerText = "";
    const checkedInput = checkInput(input.value);
    makeGuess(checkedInput);
});

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

const makeGuess = function (letter) {
 const guess = letter.toUpperCase();
 if (guessedLetters.includes(guess)) {
     message.innerText = "Try again, you have already guessed that letter";
 } else {
     guessedLetters.push(guess);
     console.log(guessedLetters);
 }
};


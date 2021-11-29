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
guessed.innerHTML = "";

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
    console.log(input.value);
    message.innerText = "";
    const checkedInput = checkInput(input.value);
    makeGuess(checkedInput);
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
      console.log(letter);
      if (array.includes(letter)) {
          newWordArray.push(letter);
      } else {
          newWordArray.push("●")
      }
  }
  let joined = newWordArray.join("")
  wordInProgess.innerText = joined;
  console.log(joined);
  playerWin(joined)
};

/* -------- Checks if player has won the game -------------*/
const playerWin = function (wordGuess) {
    const wordUpCase = word.toUpperCase();
    if (wordUpCase === wordGuess) {
        message.classList.add("win")
        message.innerHTML =  `<p class="highlight">You guessed correct the word! Congrats!</p>`

    } 

};
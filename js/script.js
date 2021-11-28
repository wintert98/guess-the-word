const guessed = document.querySelector(".guessed-letters");
const btnGuess = document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordInProgess = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainSpan = document.querySelector(".remain");
const message = document.querySelector(".message");
const btnPlayAgain = document.querySelector(".play-again");
const word = "magnolia";

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
});
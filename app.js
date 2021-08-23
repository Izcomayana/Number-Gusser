/*
GAME FUNCTION
- Player must guess a number between a min and max 
- Player gets certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose 
- Let the player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);
  
  //Validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // check if won
  if(guess === winningNum) {
    // game over - won

    gameOver(true, `${winningNum} is correct, YOU WIN!!!`);
  } else {
    // wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0) {
      // game over - lost

      gameOver(false, `Game Over, You Lost. The correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong

      // change border color
      guessInput.style.borderColor = 'red';
      // Clear Input
      guessInput.value = '';
      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // disable input
  guessInput.disabled = true;
  // set text color
  message.style.color = color;
  // Change border color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg);

  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get winning num
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min); 
}

// Set message function 
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
} 
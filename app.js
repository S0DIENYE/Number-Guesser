/*
GAME FUNCTION:
-   Player must guess a number between a min and max
-   Player gets a certain amout of guesses
-   Notify player of guesses remaining
-   Notify the player of the correct answer if they loose
-   Let player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    guessesLeft = 3;
    winningNum = getRandomNum(min,max);
    // winningNum = 0;

    //* Set Winning num to an array then loop through
    // Dynamic Winning Num

    // function Dynamic() {
    //     // i++;
    //     parseInt(winningNum++);
    //     if(winningNum >= 10){
    //         winningNum = 0;
    //     }
    //     console.log(`Winning Number: ${parseInt(winningNum)}`);
    //     // console.log(`Winning Number: ${typeof winningNum}`);
    // };
    // setInterval(Dynamic, 2500);
    // Dynamic();


// UI Elements
const   game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener('mouseup', reloadPage);

function reloadPage(e) {
    if(e.target.classList.contains('play-again')) {
        window.location.reload();
    }
};


// Listen for guess
guessBtn.addEventListener('click', function() { 
    let guess = parseInt(guessInput.value);
    console.log(`Current Guess: ${guess}`);
   

    // Check if won
    if(guess === winningNum){
        // Game over WON
        gameOver(true, `${winningNum} is correct!, YOU WIN!`);
    } else {
                // Wrong Number
            guessesLeft -= 1;

            if(guessesLeft === 0){
                gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
                
            } else{
                // Clear Input
                guessInput.value = '';
                // Game Continues (answer wrong)
                setMessage(`${guess} is not correct, You have ${guessesLeft} guesses left`, 'red');
                // One guess left
                if(guessesLeft === 1) {
                    setMessage(`You have ${guessesLeft} guess left`, 'red');
                }
            }
    }
     // Validation
     if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
});
// GAME OVER
function gameOver(won, msg) {
    // won (true/false) => btn (true/false);
    // msg
    let color;
        //  guess = parseInt(guessInput.value);

    won === true ? color = 'green' : color = 'red';

    // Disabled guess btn
    // btn = guessBtn;

    // guessesLeft === 0 || guess === winningNum ? guessBtn.disabled = true : guessBtn.disabled = false;


    // Disable input
    guessInput.disabled =  true;
    // Set border color
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set Message
    setMessage(msg);

    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += ' play-again';
}
// Get Winning Num
function getRandomNum(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// setInterval(getRandomNum, 2000);
// Set message
function setMessage(msg, color) {
    guessInput.style.borderColor = color;
    message.style.color = color;
    message.textContent = msg;
}
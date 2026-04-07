const playButton = document.getElementById("playBtn");
const guessInput = document.getElementById("guess");
const guessButton = document.getElementById("guessBtn");
const giveUpButton = document.getElementById("giveUpBtn");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
const fastest = document.getElementById("fastest");
const avgTime = document.getElementById("avgTime");
const difficulty = [document.getElementById("e"), document.getElementById("m"), document.getElementById("h")];
const name = prompt("Please enter your name:");
const feedback = document.getElementById("msg");

let randNum = -1;

playButton.addEventListener('click', function() {
    const diff = getDifficulty();
    if (diff === 'easy') {
        //from 1 to 3
        randNum = Math.floor(Math.random() * 3) + 1;
    } else if (diff === 'medium') {
        //from 1 to 10
        randNum = Math.floor(Math.random() * 10) + 1;
    } else if (diff === 'hard') {
        //from 1 to 100
        randNum = Math.floor(Math.random() * 100) + 1;
    }
    guessInput.value = '';
    guessButton.disabled = false;
    giveUpButton.disabled = false;
    playButton.disabled = true;
});

guessButton.addEventListener('click', function() {
    
const guess = parseInt(guessInput.value);
    if (isNaN(guess)) {
        feedback.textContent = "Please enter a valid number.";
        return;
    }
    if (guess > randNum) {
        feedback.textContent = `${name}: Too high! Try again.`;
        const difference = Math.abs(guess - randNum);
        if (difference <= 2) {
            feedback.textContent = `${name}: Too high! You're hot!`;
        } else if (difference <= 5) {
            feedback.textContent = `${name}: Too high! You're warm!`;
        } else {
            feedback.textContent = `${name}: Too high! You're cold!`;
        }

    } else if (guess < randNum) {
        feedback.textContent = `${name}: Too low! Try again.`;
        const difference = Math.abs(guess - randNum);
        if (difference <= 2) {
            feedback.textContent = `${name}: Too low! You're hot!`;
        } else if (difference <= 5) {
            feedback.textContent = `${name}: Too low! You're warm!`;
        } else {
            feedback.textContent = `${name}: Too low! You're cold!`;
        }
    } else {
        feedback.textContent = `${name}: Correct! You've guessed the number!`;
        guessButton.disabled = true;
        giveUpButton.disabled = true;
        playButton.disabled = false;
    }
});

giveUpButton.addEventListener('click', function() {
    feedback.textContent = `${name}: The correct number was ${randNum}. Better luck next time!`;
    guessButton.disabled = true;
    giveUpButton.disabled = true;
    playButton.disabled = false;
});

function getDifficulty() {
    for (let e of difficulty) {
        if (e.checked) {
            if (e.id === 'e') return 'easy';
            if (e.id === 'm') return 'medium';
            if (e.id === 'h') return 'hard';
        }
    }
}
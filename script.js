const playButton = document.getElementById("playBtn");
const guessInput = document.getElementById("guess");
const guessButton = document.getElementById("guessBtn");
const giveUpButton = document.getElementById("giveUpBtn");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
const fastest = document.getElementById("fastest");
const avgTime = document.getElementById("avgTime");
const difficulty = [document.getElementById("e"), document.getElementById("m"), document.getElementById("h")];
const leaderboard = document.getElementsByName("leaderboard");
let name = prompt("Please enter your name:").toLowerCase();
name = name.charAt(0).toUpperCase() + name.slice(1);
const feedback = document.getElementById("msg");

let randNum = -1;
let totalWins = 0;
let totalGuesses = 0;
let avgGuesses = 0;
let bestGuesses = ["","",""];

playButton.addEventListener('click', function () {
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
    feedback.textContent = `${name}: Game started! Make your guess.`;
    guessButton.disabled = false;
    giveUpButton.disabled = false;
    playButton.disabled = true;
});

guessButton.addEventListener('click', function () {
    totalGuesses++;
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
        totalWins++;
        avgGuesses = (((avgGuesses * (totalWins - 1)) + totalGuesses) / totalWins).toFixed(2);
        
        wins.textContent = `Wins: ${totalWins}`;
        avgScore.textContent = `Average Guesses: ${avgGuesses}`;
        guessButton.disabled = true;
        giveUpButton.disabled = true;
        playButton.disabled = false;
// Keep an array of all game scores (number of guesses to win)
// Sort the array ascending (fewest guesses = best score)
// Display the top 3 scores in the <li name="leaderboard"> elements
// The autograder plays 4 rounds with scores 3, 1, 5, 2 and checks that the leaderboard shows 1, 2, 3
        if (bestGuesses[0] === "" || totalGuesses < bestGuesses[0]) {
            bestGuesses[2] = bestGuesses[1];
            bestGuesses[1] = bestGuesses[0];
            bestGuesses[0] = totalGuesses;
        } else if (bestGuesses[1] === "" || totalGuesses < bestGuesses[1]) {
            bestGuesses[2] = bestGuesses[1];
            bestGuesses[1] = totalGuesses;
        } else if (bestGuesses[2] === "" || totalGuesses < bestGuesses[2]) {
            bestGuesses[2] = totalGuesses;
        }
        leaderboard[0].textContent = `${bestGuesses[0]}`;
        leaderboard[1].textContent = `${bestGuesses[1]}`;
        leaderboard[2].textContent = `${bestGuesses[2]}`;
        totalGuesses = 0;
    }
    console.log("Guesses: " + totalGuesses);
});

giveUpButton.addEventListener('click', function () {
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
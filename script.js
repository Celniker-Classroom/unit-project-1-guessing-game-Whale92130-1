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
const dateDisplay = document.getElementById("date");
const timerDisplay = document.getElementById("timer");
const bestTimeDisplay = document.getElementById("fastest");
const avgTimeDisplay = document.getElementById("avgTime");
function getSuffix(day) {
    if (day >= 11 && day <= 13) {
        return "th";
    } else {
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
}
function updateDate() {
    date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = Number(String(date.getHours()).padStart(2, '0'));
    let amPm = "AM";
    if (hours >= 12) {
        hours -= 12;
        amPm = "PM";
    }
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    dateDisplay.textContent = `${month} ${day}${getSuffix(day)}, ${year} ${hours}:${minutes}:${seconds} ${amPm}`;
}

function updateTimer(date) {
    const now = new Date();
    date.getTime();
    const diff = now - date;
    let minutes = Math.floor(diff / 60000);
    let seconds = Math.floor((diff % 60000) / 1000);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    timerDisplay.textContent = `Time Elapsed: ${minutes}:${seconds}`;

}

setInterval(updateDate, 1000);
updateDate();

let randNum = -1;
let totalWins = 0;
let totalAttempts = 0;
let totalGuesses = 0;
let avgGuesses = 0;
let bestGuesses = ["", "", ""];
let timerInterval;
let totalTime = 0;

guess.addEventListener("keydown", function (event) {
    if (guessButton.disabled && event.key === "Enter") {
        playButton.click();
    } else if (event.key === "Enter") {
        guessButton.click();
    }
    else if (event.key === "Escape") {
        giveUpButton.click();
    }
});

playButton.addEventListener('click', function () {
    let date = new Date();
    timerInterval = setInterval(() => updateTimer(date), 1000);
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
        totalAttempts++;
        clearInterval(timerInterval);
        updateLeaderboardandGuesses();
    }
    console.log("Guesses: " + totalGuesses);
});

giveUpButton.addEventListener('click', function () {
    feedback.textContent = `${name}: The correct number was ${randNum}. Better luck next time!`;
    if (getDifficulty() == 'easy') {
        totalGuesses = 3;
    } else if (getDifficulty() == 'medium') {
        totalGuesses = 10;
    } else if (getDifficulty() == 'hard') {
        totalGuesses = 100;
    }
    totalWins++;
    totalAttempts++;
    clearInterval(timerInterval);
    updateLeaderboardandGuesses();
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

function parseTimeText(timeText) {
    const parts = timeText.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

function formatSeconds(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

function updateLeaderboardandGuesses() {
    console.log("Total Guesses: " + totalGuesses);
    avgGuesses = (((avgGuesses * (totalAttempts - 1)) + totalGuesses) / totalAttempts).toFixed(2);
    wins.textContent = `Wins: ${totalWins}`;
    avgScore.textContent = `Average Guesses: ${avgGuesses}`;
    guessButton.disabled = true;
    giveUpButton.disabled = true;
    playButton.disabled = false;

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

    const elapsedSeconds = parseTimeText(timerDisplay.textContent.split(" ")[2]);
    totalTime += elapsedSeconds;

    const currentBestText = bestTimeDisplay.textContent.split(" ")[2] || "00:00";
    const currentBestSeconds = parseTimeText(currentBestText);
    if (bestTimeDisplay.textContent === "Fastest Time: 00:00" || elapsedSeconds < currentBestSeconds) {
        bestTimeDisplay.textContent = `Fastest Time: ${formatSeconds(elapsedSeconds)}`;
    }

    const averageSeconds = Math.round(totalTime / totalAttempts);
    avgTimeDisplay.textContent = `Average Time: ${formatSeconds(averageSeconds)}`;
}
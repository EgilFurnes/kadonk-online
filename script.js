let lives = { "Player 1": 3, "Player 2": 3 };
let currentPlayer = "Player 1";
let opponent = "Player 2";
let lastSent = null;
let rolledNumber = null;
let newRound = true;
let gameStarted = false;

const reke = [31, 32, 41, 42, 43, 51, 52, 53, 54, 61, 62, 63, 64, 65, 11, 22, 33, 44, 55, 66, 21];

function displayMessage(message) {
    document.getElementById("game").innerHTML = `
        <p>${message}</p>
        <p>Player 1 Lives: ${lives["Player 1"]} | Player 2 Lives: ${lives["Player 2"]}</p>
    `;
}

function rollDice() {
    let s1 = Math.floor(Math.random() * 6) + 1;
    let s2 = Math.floor(Math.random() * 6) + 1;
    return parseInt([s1, s2].sort((a, b) => b - a).join(""));
}

function startGame() {
    const lifeInput = parseInt(prompt("Enter the number of lives each player starts with:"));
    if (isNaN(lifeInput) || lifeInput <= 0) {
        alert("Please enter a valid positive number for lives.");
        return;
    }
    lives = { "Player 1": lifeInput, "Player 2": lifeInput };
    gameStarted = true;
    startNewRound();
}

function startNewRound() {
    displayMessage("It is Kadonk-time!");
    rolledNumber = rollDice();
    displayMessage(`${currentPlayer} rolled: ${rolledNumber}`);
    newRound = false;
}

function playTurn(action) {
    if (!gameStarted) {
        displayMessage("Please start the game by setting the number of lives.");
        return;
    }

    if (newRound) {
        startNewRound();
    } else if (action === "shake") {
        rolledNumber = rollDice();
        displayMessage(`${currentPlayer} rolled: ${rolledNumber}`);
    } else if (action === "open") {
        if (lastSent === null) {
            displayMessage("You must shake first!");
            return;
        }

        if (reke.indexOf(lastSent) >= reke.indexOf(rolledNumber)) {
            displayMessage(`Ha-ha, ${lastSent} was actually ${rolledNumber}`);
            lives[currentPlayer] -= 1;
        } else {
            displayMessage(`Liar! The actual number was ${rolledNumber}`);
            lives[opponent] -= 1;
        }

        if (lives["Player 1"] <= 0 || lives["Player 2"] <= 0) {
            displayMessage(`${lives["Player 1"] <= 0 ? "Player 2" : "Player 1"} wins the game!`);
            gameStarted = false;
            return;
        }

        newRound = true;
        lastSent = null;
        [currentPlayer, opponent] = [opponent, currentPlayer];
        displayMessage("Starting a new round...");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayMessage("Welcome to Kadonk! Click 'Start Game' to begin.");

    document.body.insertAdjacentHTML("beforeend", `
        <button onclick="startGame()">Start Game</button>
        <button onclick="playTurn('shake')">Shake</button>
        <button onclick="playTurn('open')">Open</button>
        <input type="number" id="sendInput" placeholder="Send a number" />
        <button onclick="sendNumber()">Send</button>
    `);
});

function sendNumber() {
    const send = parseInt(document.getElementById("sendInput").value);

    if (!reke.includes(send)) {
        displayMessage("Invalid: Number not allowed");
        return;
    } else if (reke.indexOf(send) < reke.indexOf(rolledNumber)) {
        displayMessage("Invalid: Number too low");
        return;
    }

    lastSent = send;
    displayMessage(`${currentPlayer} sends: ${send}`);
    [currentPlayer, opponent] = [opponent, currentPlayer];
}

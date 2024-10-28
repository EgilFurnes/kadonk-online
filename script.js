let lives = { "Player 1": 3, "Player 2": 3 };
let currentPlayer = "Player 1";
let opponent = "Player 2";
let lastSent = null;
let rolledNumber = null;
let newRound = true;

const reke = [31, 32, 41, 42, 43, 51, 52, 53, 54, 61, 62, 63, 64, 65, 11, 22, 33, 44, 55, 66, 21];

function displayMessage(message) {
    document.getElementById("game").innerHTML = `<p>${message}</p><p>Player 1 Lives: ${lives["Player 1"]} | Player 2 Lives: ${lives["Player 2"]}</p>`;
}

function rollDice() {
    let s1 = Math.floor(Math.random() * 6) + 1;
    let s2 = Math.floor(Math.random() * 6) + 1;
    return parseInt([s1, s2].sort((a, b) => b - a).join(""));
}

function playTurn(action) {
    if (newRound || action === "shake") {
        rolledNumber = rollDice();
        newRound = false;
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
            return;
        }

        newRound = true;
        lastSent = null;
        [currentPlayer, opponent] = [opponent, currentPlayer];
        displayMessage("Starting a new round...");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayMessage("Welcome to Kadonk!");

    document.body.insertAdjacentHTML("beforeend", `
        <button onclick="playTurn('shake')">Shake</button>
        <button onclick="playTurn('open')">Open</button>
    `);
});

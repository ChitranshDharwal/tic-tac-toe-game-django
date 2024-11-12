let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function renderBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.innerText = cell;
        cellDiv.addEventListener("click", () => handleCellClick(index));
        boardDiv.appendChild(cellDiv);
    });
    document.getElementById("status").innerText = `1v1 Mode - Player ${currentPlayer}'s turn`;
}

function handleCellClick(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    renderBoard();
    if (checkWin()) {
        document.getElementById("status").innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    if (board.every(cell => cell !== "")) {
        document.getElementById("status").innerText = "It's a draw!";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    return winningConditions.some(condition => condition.every(index => board[index] === currentPlayer));
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    renderBoard();
}

renderBoard();

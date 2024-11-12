// let board = ["", "", "", "", "", "", "", "", ""];
// let currentPlayer = "X";
// let gameActive = true;

// const winningConditions = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8],
//     [0, 3, 6], [1, 4, 7], [2, 5, 8],
//     [0, 4, 8], [2, 4, 6]
// ];

// function renderBoard() {
//     const boardDiv = document.getElementById("board");
//     boardDiv.innerHTML = "";
//     board.forEach((cell, index) => {
//         const cellDiv = document.createElement("div");
//         cellDiv.classList.add("cell");
//         cellDiv.innerText = cell;
//         cellDiv.addEventListener("click", () => handleCellClick(index));
//         boardDiv.appendChild(cellDiv);
//     });
//     document.getElementById("status").innerText = "Bot Mode - Player X's turn";
// }

// function handleCellClick(index) {
//     if (!gameActive || board[index] !== "") return;

//     board[index] = currentPlayer;
//     renderBoard();
//     if (checkWin()) {
//         document.getElementById("status").innerText = `Player ${currentPlayer} wins!`;
//         gameActive = false;
//         return;
//     }
//     if (board.every(cell => cell !== "")) {
//         document.getElementById("status").innerText = "It's a draw!";
//         gameActive = false;
//         return;
//     }
//     currentPlayer = currentPlayer === "X" ? "O" : "X";

//     if (gameActive && currentPlayer === "O") {
//         botMove();
//     }
// }

// function botMove() {
//     let availableCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
//     let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
//     board[randomIndex] = "O";
//     renderBoard();
//     if (checkWin()) {
//         document.getElementById("status").innerText = "Bot wins!";
//         gameActive = false;
//         return;
//     }
//     if (board.every(cell => cell !== "")) {
//         document.getElementById("status").innerText = "It's a draw!";
//         gameActive = false;
//         return;
//     }
//     currentPlayer = "X";
// }

// function checkWin() {
//     return winningConditions.some(condition => condition.every(index => board[index] === currentPlayer));
// }

// function restartGame() {
//     board = ["", "", "", "", "", "", "", "", ""];
//     currentPlayer = "X";
//     gameActive = true;
//     renderBoard();
// }

// renderBoard();




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
    document.getElementById("status").innerText = "Bot Mode - Player X's turn";
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

    if (gameActive && currentPlayer === "O") {
        botMove();
    }
}

function botMove() {
    const bestMove = minimax(board, "O").index;
    board[bestMove] = "O";
    renderBoard();
    if (checkWin()) {
        document.getElementById("status").innerText = "Bot wins!";
        gameActive = false;
        return;
    }
    if (board.every(cell => cell !== "")) {
        document.getElementById("status").innerText = "It's a draw!";
        gameActive = false;
        return;
    }
    currentPlayer = "X";
}

function checkWin() {
    return winningConditions.some(condition =>
        condition.every(index => board[index] === currentPlayer)
    );
}

function minimax(newBoard, player) {
    const availableCells = newBoard.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);

    if (checkWinner(newBoard, "O")) {
        return { score: 10 };
    } else if (checkWinner(newBoard, "X")) {
        return { score: -10 };
    } else if (availableCells.length === 0) {
        return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availableCells.length; i++) {
        const move = {};
        move.index = availableCells[i];
        newBoard[availableCells[i]] = player;

        if (player === "O") {
            const result = minimax(newBoard, "X");
            move.score = result.score;
        } else {
            const result = minimax(newBoard, "O");
            move.score = result.score;
        }

        newBoard[availableCells[i]] = "";
        moves.push(move);
    }

    let bestMove;
    if (player === "O") {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function checkWinner(board, player) {
    return winningConditions.some(condition =>
        condition.every(index => board[index] === player)
    );
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    renderBoard();
}

renderBoard();

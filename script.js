const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const emojis = {
    'X': '❌',
    'O': '⭕'
};

function createBoard() {
    board.innerHTML = '';
    gameState.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    });
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = emojis[currentPlayer];
    cell.classList.add('active');

    if (checkWinner()) {
        highlightWinnerCells();
        statusText.innerHTML = `🎉 Player ${emojis[currentPlayer]} Wins! 🎉`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${emojis[currentPlayer]}'s Turn`;
}

function highlightWinnerCells() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    winningCombos.forEach(combo => {
        if (combo.every(index => gameState[index] === currentPlayer)) {
            combo.forEach(index => {
                const cell = board.children[index];
                cell.classList.add('win');
            });
        }
    });
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombos.some(combo => {
        return combo.every(index => gameState[index] === currentPlayer);
    });
}

resetButton.addEventListener('click', () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player ${emojis[currentPlayer]}'s Turn`;
    createBoard();
});

createBoard();

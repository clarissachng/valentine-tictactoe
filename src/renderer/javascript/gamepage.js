const { remote } = require('electron');

const board = document.getElementById('board');
let cells = Array(9).fill(null);
let currentPlayer = 'O'; // Player 2 starts

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    return cells.includes(null) ? null : 'draw';
}

function handleClick(index) {
    if (!cells[index]) {
        cells[index] = currentPlayer;
        render();
        let winner = checkWinner();

        if (winner) {
            setTimeout(() => {
                if (winner === 'O') {
                    window.location.href = 'winpage.html';
                } else if (winner === 'X') {
                    window.location.href = 'losepage.html';
                } else {
                    window.location.href = 'drawpage.html';
                }
            }, 500);
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

console.log('Game JS loaded');

function render() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');

        if (cell) {
            const img = document.createElement('img');
            img.src = cell === 'X' ? '../assets/icons/me-icon.png' : '../assets/icons/you-icon.png';
            img.alt = cell;
            img.classList.add('game-icon');
            div.appendChild(img);
        }

        div.addEventListener('click', () => handleClick(index));
        board.appendChild(div);
    });
}

render();

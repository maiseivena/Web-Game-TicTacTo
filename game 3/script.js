document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = [];
    let currentPlayer = 'X';
    let gameWon = false;

    // Inisialisasi papan permainan
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
            cells.push(cell);
        }
    }

    // Fungsi untuk menangani klik pada sel
    function handleCellClick(event) {
        if (gameWon) return;

        const clickedCell = event.target;

        if (clickedCell.textContent === '') {
            clickedCell.textContent = currentPlayer;

            if (checkWinner()) {
                alert(`Player ${currentPlayer} wins!`);
                gameWon = true;
            } else if (checkDraw()) {
                alert('It\'s a draw!');
                gameWon = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    // Fungsi untuk memeriksa apakah ada pemenang
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // baris
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolom
            [0, 4, 8], [2, 4, 6]             // diagonal
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent !== '' &&
                   cells[a].textContent === cells[b].textContent &&
                   cells[a].textContent === cells[c].textContent;
        });
    }

    // Fungsi untuk memeriksa apakah permainan seri (draw)
    function checkDraw() {
        return cells.every(cell => cell.textContent !== '');
    }
});

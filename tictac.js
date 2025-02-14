let button = document.querySelector('.btn');
let grid = document.querySelector('.tictactoe');
let arr = new Array(9).fill(0);
let turn = 0;

function checked() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]              
    ];
    for (let [a, b, c] of winningCombinations) {
        if (arr[a] !== 0 && arr[a] === arr[b] && arr[b] === arr[c]) {
            return arr[a]; 
        }
    }
    return 0; 
}

function reset() {
    const cells = document.querySelectorAll('.l');
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    });
    arr.fill(0);
    turn = 0;

    let player1 = document.querySelector('.player1');
    let player2 = document.querySelector('.player2');
    let namesContainer = document.querySelector('.pln');

    namesContainer.textContent = `Player 1: ${player1.value} (X)  |  Player 2: ${player2.value} (O)`;
}

button.addEventListener("click", () => {
    let player1 = document.querySelector('.player1');
    let player2 = document.querySelector('.player2');

    if (player1.value === '' || player2.value === '') {
        alert('Please enter the player names');
        return;
    }

    document.querySelector('.container').style.display = 'none';
    document.querySelector('.main').style.display = 'flex';

    let namesContainer = document.querySelector('.pln');
    namesContainer.textContent = `Player 1: ${player1.value} (X)  |  Player 2: ${player2.value} (O)`;

    const cells = document.querySelectorAll('.l');
    cells.forEach((cell, index) => {
        cell.onclick = function () {
            if (cell.textContent !== "") return; 

            let currentPlayer = turn % 2 === 0 ? "X" : "O";
            arr[index] = currentPlayer === "X" ? 1 : 2;       
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());

            let winner = checked();
            if (winner) {
                namesContainer.textContent = `${winner === 1 ? player1.value : player2.value} WON!`;
                setTimeout(reset, 2000);
                return;
            }

            if (turn === 8) {  // Only trigger draw when board is full
                namesContainer.textContent = "It's a DRAW!";
                setTimeout(reset, 2000);
                return;
            }

            turn++;
        };
    });
});

document.querySelector('.restart').addEventListener('click', reset);

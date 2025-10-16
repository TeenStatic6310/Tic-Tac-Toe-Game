<script>
    // --- Game State Variables ---
    // Array representing the board: 0-8 indices correspond to the cells
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true; // Flag to stop clicks after a win or draw

    // DOM elements
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.getElementById('status-message');
    const resetButton = document.getElementById('reset-button');

    // Winning combinations (indices of the board array)
    const winningConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];

    // --- Core Functions ---

    // Function to update the status message
    const updateStatus = (message) => {
        statusMessage.textContent = message;
    };

    // Function to check for win or draw
    const checkResult = () => {
        let roundWon = false;

        // 1. Check for a Win
        for (let i = 0; i < winningConditions.length; i++) {
            const condition = winningConditions[i];
            let a = board[condition[0]];
            let b = board[condition[1]];
            let c = board[condition[2]];

            // If any cell in the condition is empty, skip
            if (a === '' || b === '' || c === '') {
                continue;
            }
            // If all three cells match, a player has won
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            updateStatus(`Player ${currentPlayer} Wins! 🎉`);
            isGameActive = false;
            return;
        }

        // 2. Check for a Draw (if no win, and all cells are filled)
        let roundDraw = !board.includes("");
        if (roundDraw) {
            updateStatus("It's a Draw! 🤝");
            isGameActive = false;
            return;
        }

        // 3. Continue Game: switch player
        changePlayer();
    };

    // Function to handle a cell being clicked
    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        // Check if the cell is already filled or if the game is over
        if (board[clickedCellIndex] !== "" || !isGameActive) {
            return;
        }

        // Update the board array and the cell's visual content
        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer, 'filled'); // Add class for color and styling

        checkResult();
    };

    // Function to switch the current player
    const changePlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus(`It's Player ${currentPlayer}'s turn`);
    };

    // Function to reset the game state
    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        isGameActive = true;
        updateStatus(`Player ${currentPlayer} starts!`);

        // Clear all cell content and remove styling classes
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('X', 'O', 'filled');
        });
    };

    // --- Event Listeners and Initialization ---

    // Attach click listener to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Attach click listener to the reset button
    resetButton.addEventListener('click', resetGame);

    // Initial status message
    resetGame();

</script>

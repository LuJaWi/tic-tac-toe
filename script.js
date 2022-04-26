// Objects: Game board

const Game = () => {
    // Create player object factory within game object (can't have a game without players)
    const Player = (name, marker) => {
        marker = marker
        winCount = 0;
        return {marker, winCount}
    }

    // Create 2 player objects
    player1 = Player("player1", "X")
    player2 = Player("player2", "O")

    // Start with clear game board
    Gameboard.clearBoard()

    // playerTurn acts as proxy object for the active player
    playerTurn = player1 // Player 1 starts by default

    // function for switching player turn
    const switchTurn = () => {
        if (playerTurn == player1) {
            playerTurn = player2
        } else if (playerTurn == player2) {
            playerTurn = player1
        }
    }

    // Create event listeners for playing the game
    document.querySelectorAll(".game-square").forEach(square => {
        square.addEventListener('click', () => {
            // Prevent changing already chosen squares
            if (square.innerText != 'X' && square.innerText != "O") {
                // Marker is called from playerTurn object (which is a copy of 
                // either of the player objects)
                Gameboard.makeMove(playerTurn.marker, square.id)
                switchTurn() // Switch player turn after every move
            }
        })
    })

    return{playerTurn}
}


const Gameboard = (() => {
    let gameArray = [
        ' ',' ',' ',
        ' ',' ',' ',
        ' ',' ',' '
    ]

    const updateBoard = () => {
        for (let i = 0; i < 9; i++)
        document.getElementById(String(i)).innerText = gameArray[i]
    }

    const makeMove = (marker, index) => {
        gameArray[index] = marker
        document.getElementById(String(index)).innerText = gameArray[index]
        console.log("Win status: " + checkWin(marker));
    }

    const clearBoard = () => {
        gameArray = [
            ' ',' ',' ',
            ' ',' ',' ',
            ' ',' ',' '
        ]
        updateBoard();
    }

    // Function to check if anyone has won yet
    const checkWin = (marker) => {
        if ( // Verticals
            gameArray[0] + gameArray[3] + gameArray[6] == marker + marker + marker ||
            gameArray[1] + gameArray[4] + gameArray[7] == marker + marker + marker ||
            gameArray[2] + gameArray[5] + gameArray[8] == marker + marker + marker
        ) {
            return true
        } else if ( // Horizontals
            gameArray[0] + gameArray[1] + gameArray[2] == marker + marker + marker ||
            gameArray[3] + gameArray[4] + gameArray[5] == marker + marker + marker ||
            gameArray[6] + gameArray[7] + gameArray[8] == marker + marker + marker
        ) {
            return true
        } else if ( // Diagonals
            gameArray[0] + gameArray[4] + gameArray[8] == marker + marker + marker ||
            gameArray[2] + gameArray[4] + gameArray[6] == marker + marker + marker
        ) {
            return true
        } else {
            return false
        }
    }
    

    return {gameArray, makeMove, clearBoard}
})()

Game()
// Objects: Game board

const Game = () => {
    const Player = (name, marker) => {
        const showName = () => name;
        winCount = 0;
        marker = marker;
        isPlayerTurn = false
        return {showName, marker, winCount, isPlayerTurn}
    }

    player1 = Player(prompt("Player 1 Name:"), "X")
    player2 = Player(prompt("Player 2 Name:"), "O")

    return{player1, player2}
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
        initializeEventListeners()
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

    const initializeEventListeners = () => {
        document.querySelectorAll(".game-square").forEach(square => {
            square.addEventListener('click', () => {
                makeMove('X', square.id)
            })
        })
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
    
    initializeEventListeners()

    return {gameArray, makeMove, clearBoard}
})()
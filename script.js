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
                // Check Win Status
                console.log("Win status: " + Gameboard.checkWin(playerTurn.marker));
                // Display win message if checkWin returns true
                if (Gameboard.checkWin(playerTurn.marker)) {
                    document.querySelector(".win-message").classList.remove("hidden");
                    document.querySelector(".win-message").innerText = playerTurn.marker + " Wins!"
                } if (Gameboard.checkDraw(player1.marker, player2.marker)) {
                    document.querySelector(".draw-message").classList.remove("hidden");
                }
                switchTurn() // Switch player turn after every move
            }
        })
    })

    document.querySelector(".new-game").addEventListener('click', () => {
        Game()
    })

    return{}
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
    }

    const clearBoard = () => {
        gameArray = [
            ' ',' ',' ',
            ' ',' ',' ',
            ' ',' ',' '
        ]
        document.querySelector(".win-message").classList.add("hidden");
        document.querySelector(".draw-message").classList.add("hidden");
        updateBoard();
    }


    // Function to check if anyone has won yet
    const checkWin = (marker) => {
        winArrays = [
            [0,3,6], // Verticals
            [1,4,7],
            [2,5,8],
            [0,1,2], // Horizontals
            [3,4,5],
            [6,7,8],
            [0,4,8], // Diagonals
            [2,4,6],
        ]

        for (let i = 0; i < 8; i++) {
            let testString = ''
            for (let j = 0; j < 3; j++) {
                testString += gameArray[winArrays[i][j]]
            }
            if (testString == marker.repeat(3)) {
                markWin(winArrays[i]);
                return true
            }
        } return false
    }

    const checkDraw = (marker1, marker2) => {
        if (checkWin(marker1) || checkWin(marker2)) {return false}
        let checkString = '';
        for (square in gameArray) {
            if (gameArray[square] != ' ') {
            checkString += gameArray[square]
            }
        }
        if (checkString.length == 9) {
            return true
        } else {
            return false
        }
    }
    

    return {gameArray, makeMove, clearBoard, checkWin, checkDraw}
})()

Game()
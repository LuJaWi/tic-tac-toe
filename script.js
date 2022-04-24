// Objects: Game board, players

const Player = (name) => {
    const showName = () => name;
    winCount = 0;
    marker = '';
    isPlayerTurn = false
    return {showName, marker, winCount, isPlayerTurn}
}

player1 = Player("Luke");
player2 = Player("Maeve");

console.log(player1.showName())

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
                console.log('click')
            })
        })
    }
    
    initializeEventListeners()

    return {gameArray, makeMove, clearBoard}
})()
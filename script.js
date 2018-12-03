let board = []

function initBoard(length, width) {
  board = []
  for (let i = 0; i < length; i++) {
    board[i] = []
    for (let j = 0; j < width; j++) {
      board[i].push({
        isBomb: false,
        number: 0,
        isOpen: false,
        showBoard: "_",
        showCheat: "_"
      })
    }
  }
}

function initBomb(bombs) {
  console.log(board[0].length)
  let col = Math.floor(Math.random() * board.length)
  let row = Math.floor(Math.random() * board[0].length)
  while (bombs > 0) {
    if (board[row][col].isBomb === false) {
      board[row][col].isBomb = true
      board[row][col].showCheat = "*"
      bombs--
    } else {
      col = Math.floor(Math.random() * board.length)
      row = Math.floor(Math.random() * board[0].length)
    }
  }
}


function init() {
  initBoard(5,5)
  initBomb(5)
  console.log(board)
}

init()
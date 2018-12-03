var boardElm = document.querySelector(".board")
var boardCheatElm = document.querySelector(".boardCheat")
var textCoord = document.querySelector(".inputCoord")
var submitCoord = document.querySelector(".submitCoord")
boardElm.style.whiteSpace = 'pre'
boardCheatElm.style.whiteSpace = 'pre'

let board = []
let openCount = 0;
let bomb = 0;
const NEIGHBOR = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: 1 },
  { row: 1, col: 1 },
  { row: 1, col: 0 },
  { row: 1, col: -1 },
  { row: 0, col: -1 },
]

submitCoord.addEventListener('click', submitCoordAction)

function initBoard(length, width) {
  board = []
  for (let i = 0; i < length; i++) {
    board[i] = []
    for (let j = 0; j < width; j++) {
      board[i].push({
        isBomb: false,
        isOpen: false,
        showBoard: "_",
        showCheat: "_"
      })
    }
  }
}

function submitCoordAction() {
  let coordRaw = textCoord.value.split(",")
  checkTile(Number(coordRaw[0]) - 1, Number(coordRaw[1]) - 1)
  printBoard()
  if (board.length * board[0].length - openCount === bomb) {
    console.log("menang")
  }
}

function initBomb(bombs) {
  let col = Math.floor(Math.random() * board.length)
  let row = Math.floor(Math.random() * board[0].length)
  bomb = bombs
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

function isValidBoard(length, width) {
  if (length <= 0 || width <= 0) {
    return false
  }

  return true
}

function isValidBomb(bombs) {
  if (bombs > (board.length * board[0].length) - 2) {
    return false
  }

  if (bombs <= 0) {
    return false
  }

  return true
}



function checkTile(row, col) {
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
    return
  }
  if (board[row][col].isOpen === true) {
    return
  }
  let count = 0

  if (board[row][col].isBomb === true) {
    board[row][col].isOpen = true
    return
  }

  NEIGHBOR.forEach(elm => {
    let newRow = row + elm.row;
    let newCol = col + elm.col;
    if (newRow < board[0].length && newRow >= 0 && newCol < board.length && newCol >= 0) {
      if (board[newRow][newCol].isBomb === true) {
        count++
      }
    }
  })

  if (count !== 0) {
    board[row][col].showBoard = count
    board[row][col].isOpen = true
    board[row][col].showCheat = count
    openCount++
    return
  } else {
    board[row][col].isOpen = true
    board[row][col].showBoard = count
    board[row][col].showCheat = count
    openCount++
    NEIGHBOR.forEach(elm => {
      checkTile(row + elm.row, col + elm.col)
    })
  }
}

function printBoard(cheat = false) {
  let stringToPrint = ""
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      stringToPrint += cheat === false ? `${board[i][j].showBoard} ` : `${board[i][j].showCheat} `
    }
    stringToPrint += "\n"
  }

   return cheat === false ? boardElm.textContent = stringToPrint : boardCheatElm.textContent = stringToPrint
}

function init() {
  if (isValidBoard(5,5)) {
    initBoard(5, 5)
  } else {
    return 
  }

  if (isValidBomb(1)) {
    initBomb(1)
  } else {
    return 
  }

  printBoard(true)
  printBoard()
}

init()
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex,columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('BOMB! The game is over!');
      this._board.print();
    } else if (this._board.hasSafeTiles()) {
      console.log('The game is over! YOU WON!');
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  get bombBoard(){
    return this._bombBoard;
  }

  flipTile(rowIndex, columnIndex){
  if (this._playerBoard[rowIndex][columnIndex] !== ' '){
  console.log('This tile has already been flipped!');
  return flipTile;
} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
    this._playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
  }
  this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [[1,1], [1,0], [1,-1], [0,1], [0,-1], [-1,1], [-1,0], [-1,-1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles(){
    return this._numberOfTiles === this._numberOfBombs;
    }

  print(){
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [];
    for (let rows = 0; rows < numberOfRows; rows++ ){
      let row = [];
      for (let columns = 0; columns < numberOfColumns; columns++){
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
    let board = [];
    for (let rows = 0; rows < numberOfRows; rows++ ){
     let row = [];
       for (let columns = 0; columns < numberOfColumns; columns++){
         row.push(null);
       }
       board.push(row);
     }
   let numberOfBombsPlaced = 0;
   //while moze dodawac bombe na bombie - juz fixed
   while (numberOfBombsPlaced < numberOfBombs) {
     let randomRowIndex = Math.floor(Math.random() * numberOfRows);
     let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
     if (board[randomRowIndex][randomColumnIndex] != 'B'){
       board[randomRowIndex][randomColumnIndex] = 'B';
       numberOfBombsPlaced++;
     }
   }
   return board;
  }
}


const g = new Game(3,3,1);
g.playMove(1,2);
g.playMove(0,0);
g.playMove(0,1);
g.playMove(0,2)
g.playMove(1,0);
g.playMove(2,0);
g.playMove(2,1);
g.playMove(2,2);
//g.playMove(1,1);

//g.playMove(0,0);

/*
let playerBoard = generatePlayerBoard(3,4);

let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 1, 1);

console.log('Updated Player Board: ');
printBoard(playerBoard);
*/

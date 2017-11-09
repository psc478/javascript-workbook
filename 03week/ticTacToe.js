'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let blankBoard = [ //blankBoard is for the purposes of resetting after a game
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin() {
  if (((board[0][0]!=' ')&&((board[0][0]===board[0][1])&&(board[0][0]===board[0][2]))) || //top row
      ((board[1][0]!=' ')&&((board[1][0]===board[1][1])&&(board[1][0]===board[1][2]))) || //middle row
      ((board[2][0]!=' ')&&((board[2][0]===board[2][1])&&(board[2][0]===board[2][2])))){ //bottom row
        return true
      }
}

function verticalWin() {
  if (((board[0][0]!=' ')&&((board[0][0]===board[1][0])&&(board[0][0]===board[2][0]))) || //left column
      ((board[0][1]!=' ')&&((board[0][1]===board[1][1])&&(board[0][1]===board[2][1]))) || //middle column
      ((board[0][2]!=' ')&&((board[0][2]===board[1][2])&&(board[0][2]===board[2][2])))){ //right column
        return true
      }
}

function diagonalWin() {
  if (((board[0][0]!=' ')&&((board[0][0]===board[1][1])&&(board[0][0]===board[2][2]))) ||
      ((board[2][0]!=' ')&&((board[2][0]===board[1][1])&&(board[2][0]===board[0][2])))){
        return true
      }
}

function checkForWin() {
  if (horizontalWin()||verticalWin()||diagonalWin()){
    console.log("********************");
    console.log("***PLAYER "+playerTurn+" WINS!***");
    console.log("********************");
    board = blankBoard;
    return true;
  }
}

function ticTacToe(row, column) {
    //checks for valid input
    if (((row==='0')||(row==='1')||(row==='2'))&&((column==='0')||(column==='1')||(column==='2'))){
      if ((playerTurn==='X')&&(board[row][column]===' ')){
        board[row][column]='X';
        checkForWin();
        playerTurn='O'; //change player turn
      }  else if ((playerTurn==='O')&&(board[row][column]===' ')){
        board[row][column]='O';
        checkForWin();
        playerTurn='X'; //change player turn
      } else if (board[row][column]!=' ') {
        console.log("***That space already has a symbol in it. Try again.***");
    }
  }else { //if invalid input
    console.log("***That input is invalid. Try again.***");
  }
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}

// first two tests had errors: the inputs for ticTacToe() need to be strings

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe('1', '1');
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe('0', '0');
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}

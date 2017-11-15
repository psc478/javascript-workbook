'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let playerTurn = 'O';

/*function Checker() {
  this.king = no;
  this.symbol =
  //define Checker attributes
  //checker.create per checker
}*/

class Checker {
  constructor(symbol, king){
    this.symbol = symbol;
    this.king = king;
    //this.row = game.board.grid[row];
    //this.column = game.board.grid[column];
    //this.where = this.row.tostring() + this.column.tostring();
  }
  moveChecker(whichPiece, toWhere){

  }
}

function Board() {
  this.grid = [];
  // creates an 8x8 array, filled with null values
  this.createGrid = function() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
       if (((row%2==0)&&(column%2!=0))||((row%2!=0)&&(column%2==0))) {
          if (row<3){
            this.grid[row].push(new Checker('X',false));
          }
          if (row>4){
            this.grid[row].push(new Checker('O',false));
          }
        }else{
          this.grid[row].push(null);
        }
      }
    }
  };

  // prints out the board
  this.viewGrid = function() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  };

  // Your code here
}
function Game() {

  this.board = new Board();
  this.moveChecker = function(whichPiece, toWhere){
    let x1 = Number(whichPiece.charAt(0));
    let y1 = Number(whichPiece.charAt(1));
    let x2 = Number(toWhere.charAt(0));
    let y2 = Number(toWhere.charAt(1));
    //If the player enters an empty square as whichPiece
    if (game.board.grid[y1][x1]===null){
      console.log("The square you specified in response to 'Which piece?' has no piece in it. Please try again.")
      return;
    }

    //If the 'O' player enters a square with the wrong piece as whichPiece
    if (playerTurn==='O'){
      if(game.board.grid[y1][x1].symbol==='X'){
        console.log("The square you specified in response to 'Which piece?' has an 'X' piece in it. Please try again.")
        return;
      }else{
        if(game.board.grid[y2][x2]!=null){
          console.log("The square you are trying to move to is already occupied. Please try again.")
          return;
        }else{
//          if (((y2!=y1+1)&&(Math.abs(x2-x1)!=1))||
//          (((y2!=y1+2)&&(Math.abs(x2-x1)!=2))&&
//          (((x2>x1)&&(game.board.grid[y1+1][x1+1].symbol!='X'))||
//          ((x1>x2)&&(game.board.grid[y1+1][x1-1].symbol!='X'))))){
//            console.log("The square you want to move to is not diagonal from the square with the piece in it. Please try again.");
//            return;
//          }else{
            let currentChecker = game.board.grid[y1][x1];
            game.board.grid[y2].splice(x2,1,currentChecker);
            game.board.grid[y1].splice(x1,1,null);
            if (Math.abs(x2-x1)==2){
              let deadx = (x1+x2)/2;
              let deady = (y1+y2)/2;
              game.board.grid[deady].splice(deadx,1,null);
            }

//          }
        }


        //if toWhere is diagonal and empty, move piece
        //if toWhere is diagonal and occupied by same piece, console.log error
        //if toWhere is diagonal and occupied by opposite piece and the space diagonal from THAT is empty, capture piece
        //if toWhere row is 0, king
        //if king, allow backwards moves
        //repetitive captures (if possible)
      }
      playerTurn='X';
      return;
    }

    //If the 'X' player enters a square with the wrong piece as whichPiece
    if (playerTurn==='X'){
      if(game.board.grid[y1][x1].symbol==='O'){
        console.log("The square you specified in response to 'Which piece?' has an 'X' piece in it. Please try again.")
        return;
      }else{
        if(game.board.grid[y2][x2]!=null){
          console.log("The square you are trying to move to is already occupied. Please try again.")
          return;
        }else{
            let currentChecker = game.board.grid[y1][x1];
            game.board.grid[y2].splice(x2,1,currentChecker);
            game.board.grid[y1].splice(x1,1,null);
            if (Math.abs(x2-x1)==2){
              let deadx = (x1+x2)/2;
              let deady = (y1+y2)/2;
              game.board.grid[deady].splice(deadx,1,null);
            }
          }
        //if toWhere is diagonal and empty, move piece
        //if toWhere is diagonal and occupied by same piece, console.log error
        //if toWhere is diagonal and occupied by opposite piece and the space diagonal from THAT is empty, capture piece
        //if toWhere row is 0, king
        //if king, allow backwards moves
        //repetitive captures (if possible)
      }
      playerTurn='O';
      return;
    }
  }
  //define moveChecker function
  //flip between players
  this.start = function() {
    this.board.createGrid();
    console.log('Refer to each piece/space by the column number then row number such as "10" or "67"')
    // Your code here
  };
}

function getPrompt() {
  game.board.viewGrid();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', function () {
    it('should move a checker', function () {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}

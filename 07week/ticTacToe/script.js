'use strict';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerTurn: "X",
      board: [null,null,null,null,null,null,null,null,null]
    }
    this.placeSymbol = this.placeSymbol.bind(this);
  }


/*
*This function puts symbols on the Board
*
*@param event The object being clicked on
*/
  placeSymbol(event) {
    console.log("The event object: ", event);
    console.log("The element clicked: ", event.target);
    console.log("The value is: ", event.target.getAttribute("data-cell"));

/*
*This function checks for a horizontal win
*
*@param x The component to check for a win on
*/
    function horizontalWin(x) {
      if (((x.state.board[0]!=null)&&((x.state.board[0]===x.state.board[1])&&(x.state.board[0]===x.state.board[2]))) || //top row
          ((x.state.board[3]!=null)&&((x.state.board[3]===x.state.board[4])&&(x.state.board[3]===x.state.board[5]))) || //middle row
          ((x.state.board[6]!=null)&&((x.state.board[6]===x.state.board[7])&&(x.state.board[6]===x.state.board[8])))){ //bottom row
            return true
          }
    }


/*
*This function checks for a vertical win
*
*@param x The component to check for a win on
*/
    function verticalWin(x) {
      if (((x.state.board[0]!=null)&&((x.state.board[0]===x.state.board[3])&&(x.state.board[0]===x.state.board[6]))) || //left column
          ((x.state.board[1]!=null)&&((x.state.board[1]===x.state.board[4])&&(x.state.board[1]===x.state.board[7]))) || //middle column
          ((x.state.board[2]!=null)&&((x.state.board[2]===x.state.board[5])&&(x.state.board[2]===x.state.board[8])))){ //right column
            return true
          }
    }

/*
*This function checks for a diagonal win
*
*@param x The component to check for a win on
*/
    function diagonalWin(x) {
      if (((x.state.board[0]!=null)&&((x.state.board[0]===x.state.board[4])&&(x.state.board[0]===x.state.board[8]))) ||
          ((x.state.board[6]!=null)&&((x.state.board[6]===x.state.board[4])&&(x.state.board[6]===x.state.board[2])))){
            return true
          }
    }

/*
*This function checks for a win on the Board
*
*@param y The component to check for a win on
*/
    function checkForWin(y) {
      if (horizontalWin(y)||verticalWin(y)||diagonalWin(y)){
        let myFunction = function(){
          alert("Player "+y.state.playerTurn+" Wins!");
        }
        setTimeout(myFunction,200); //this is so that the winning symbol shows up on the board before the alert
        //y.state.board = [null,null,null,null,null,null,null,null,null]; Couldn't get this to easily reset the board after a win
        return true;
      }
    }


    let task = event.target.getAttribute("data-cell");

    if ((this.state.playerTurn==="X")&&(this.state.board[task]===null)){
      console.log("Orig Board: "+this.state.board);
      this.state.board[task] = "X";
      let newBoard = this.state.board;
      const newState = {
        board: newBoard
      }
      console.log("Task: "+task);
      console.log("Board: "+this.state.board);
      this.setState(newState);
      checkForWin(this);
      if (!((horizontalWin(this)||verticalWin(this)||diagonalWin(this)))) { //if no wins
        this.state.playerTurn="O";
      }

    }else if ((this.state.playerTurn==="O")&&(this.state.board[task]===null)){
      this.state.board[task] = "O";
      let newBoard = this.state.board;
      const newState = {
        board: newBoard
      }
      console.log("Task: "+task);
      console.log("Board: "+this.state.board);
      this.setState(newState);
      checkForWin(this);
      if (!((horizontalWin(this)||verticalWin(this)||diagonalWin(this)))) { //if no wins
        this.state.playerTurn="X";
      }
    }

  }

  render() {
    return (
      <div>
        <div className="row">
          <div data-cell="0" onClick={this.placeSymbol}>{this.state.board[0]}</div>
          <div data-cell="1" onClick={this.placeSymbol}>{this.state.board[1]}</div>
          <div data-cell="2" onClick={this.placeSymbol}>{this.state.board[2]}</div>
        </div>
        <div className="row">
          <div data-cell="3" onClick={this.placeSymbol}>{this.state.board[3]}</div>
          <div data-cell="4" onClick={this.placeSymbol}>{this.state.board[4]}</div>
          <div data-cell="5" onClick={this.placeSymbol}>{this.state.board[5]}</div>
        </div>
        <div className="row">
          <div data-cell="6" onClick={this.placeSymbol}>{this.state.board[6]}</div>
          <div data-cell="7" onClick={this.placeSymbol}>{this.state.board[7]}</div>
          <div data-cell="8" onClick={this.placeSymbol}>{this.state.board[8]}</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<TicTacToe />, document.getElementById('tic-tac-toe'));

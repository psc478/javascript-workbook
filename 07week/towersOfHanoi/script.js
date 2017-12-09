'use strict';

class TowersOfHanoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
              $block: null,
              A: [100,75,50,25],
              B: [],
              C: []
    }
    this.movePiece = this.movePiece.bind(this);
  }

  /*
  *This function should*** move the blocks in the game. ***You can see the blocks move in the console.log statements, but the blocks do not visually move
  *
  *@param event Clicking on the stacks
  */
  movePiece(event) {
    console.log("The event object: ", event);
    console.log("The element clicked: ", event.target);
    console.log("The value is: ", event.target.getAttribute("data-stack"));
    console.log("State Before Move: ",this.state);

    let task = event.target.getAttribute("data-stack");
    //console.log("typeof task: ",typeof task);
    let $stack;
    if(task==="A"){
      $stack = this.state.A;
      //console.log("$stack(A): "+$stack);
    }else if (task==="B") {
      $stack = this.state.B;
      //console.log("$stack(B): "+$stack);
    }else if (task==="C") {
      $stack = this.state.C;
      //console.log("$stack(C): "+$stack);
    }
      if (this.state.$block===null) {
        //this.state.$block = $stack[$stack.length-1];
        //$stack.splice(($stack.length-1),1);
        this.state.$block = $stack.pop();
        //event.children().last().detach();
        let newBlock = this.state.$block;
        let stillA = this.state.A;
        let stillB = this.state.B;
        let stillC = this.state.C;
        const newState = {
          $block: newBlock,
          A: stillA,
          B: stillB,
          C: stillC
        }
      } else {
        // console.log($block.attr("data-block"),$(this).children().last().attr("data-block"))
        if(this.state.$block>$stack[$stack.length-1]) {
          alert("BAD MOVE");
        } else {
        //$stack.splice($stack[$stack.length-1],0,this.state.$block);
        $stack.push(this.state.$block);
        this.state.$block = null;
        let newBlock = this.state.$block;
        let newA = this.state.A;
        let newB = this.state.B;
        let newC = this.state.C;
        const newState = {
          $block: newBlock,
          A: newA,
          B: newB,
          C: newC
        }
        if (newC.length===4) {
          alert("You win!");
        }
        //moves++;
        // console.log($("#winner").children().length);
      }
      console.log("State After Move: ",this.state);

      }


    }

  /*
  *This function converts the arrays in state to divs
  *
  *@param numbers The values from the state arrays
  */
  convertToDivs (numbers){
    return (<div key={numbers} data-block={numbers}></div>)
  }

  /*
  *This function should*** render the the blocks. ***You can see the blocks move in the console.log statements, but the blocks do not visually move
  */
  render() {

    /*function convertToDivs (numbers){
      return (<div key={numbers} data-block={numbers}></div>)
    }*/

    let Ablocks = this.state.A.map(this.convertToDivs);
    let Bblocks = this.state.B.map(this.convertToDivs);
    let Cblocks = this.state.C.map(this.convertToDivs);

    return (
      <div>
        <div data-stack="A" onClick={this.movePiece}>
          {Ablocks}
        </div>
        <div data-stack="B" onClick={this.movePiece}>
          {Bblocks}
        </div>
        <div data-stack="C" onClick={this.movePiece}>
          {Cblocks}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<TowersOfHanoi />, document.getElementById('towers-of-hanoi'));

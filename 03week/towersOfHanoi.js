'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

/*
*This function displays the "board" to the user
*/
function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

/*
*This function removes a block from a stack and adds that block to a different stack
*
* @param startStack the stack we are removing the element from
* @param endStack the stack we are adding the element to
*/
function movePiece(startStack, endStack) {
  let blockMove = stacks[startStack].pop(); //remove the "top block" from startStack
  stacks[endStack].push(blockMove); //add the removed block to endStack
}

/*
*This function checks to see if the proposed move is legal
*
* @param startStack the stack we are removing the element from
* @param endStack the stack we are adding the element to
* @return true if the move is legal
*/
function isLegal(startStack, endStack) {
  if (((startStack==='a')||(startStack==='b')||(startStack==='c'))&&
     ((endStack==='a')||(endStack==='b')||(endStack==='c'))) { //checking to make sure input is valid
    let begin = stacks[startStack];
    let final = stacks[endStack];
    //console.log("Length of startStack: " + begin.length);
    //console.log("Value of block being moved: " + begin[begin.length - 1]);
    //console.log("Value of block being topped off: " + final[final.length - 1]);
    if (begin[begin.length - 1] > final[final.length - 1]) { //making sure the "block" is being move onto a larger "block"
      console.log("***ILLEGAL MOVE***");
    } else{
      return true;
    }
  } else{
    console.log("***Invalid input.***")
  }
}

/*
*This function checks for a win
*/
function checkForWin() {
  if (stacks.c[3] === 1){ //checks for the "1" block on top of a four-stack in stack "c."
    console.log("**************");
    console.log("***YOU WIN!***");
    console.log("**************");
    stacks = {
      a: [4, 3, 2, 1],
      b: [],
      c: []
    };
  }
}

/*
*This function runs the game
*
* @param startStack the stack we are removing the element from
* @param endStack the stack we are adding the element to
*/
function towersOfHanoi(startStack, endStack) {
    if  (isLegal(startStack, endStack)) { //if move is legal, move piece then check for win
    movePiece(startStack, endStack);
    checkForWin();
  }
}

/*
*This function prompts the user for inputs then runs towersOfHanoi
*/
function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => { //get user input to define what stack the "block" is being taken from
    rl.question('end stack: ', (endStack) => { //get user to define what stack the "block" is being placed on
      towersOfHanoi(startStack, endStack); //run game logic
      getPrompt(); //recursion to prompt next move
    });
  });
}

getPrompt(); //start game on run

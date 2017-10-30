'use strict';

const assert = require('assert');
const readline = require('readline');
const colors = require('colors');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

/*
*This function prints the board: the hints and their corresponding guesses
*/
function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

/*
*This function generates a random 4-letter solution using the first 8 letters of the alphabet (duplicates allowed)
*/
function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
//    console.log('Solution is: ' + solution);
  }
}

/*
*This function generates a random integer from which to correspond to a random letter in generateSolution
*
* @param min minimum value allowed
* @param max maximum value allowed
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*
*This function gives a hint based on the inputted guess; for each letter that exactly matches between the guess and the solution, redPeg will increment by one. For each letter that matches, except for location, whitePeg will increment by one.
*
* @param guess The guess entered by the user
*/
function generateHint(guess) {
  let redPeg = 0;
  let whitePeg = 0;
  let guessArray = guess.split("");
  let solutionArray = solution.split("");
  for (let i=0; i < 4; i++) {
    let x = guessArray[i];
    let y = solutionArray[i];
    if (guessArray[i]===solutionArray[i]){
      //for each guess letter that matches each solution letter, tick up one red, then set index of array to null to avoid false positives when tallying whitePeg
      redPeg++;
      solutionArray[i] = null;
    }
  }
  for (let i=0; i < 4; i++) {
    //for index of each guess letter that matches a letter (but not idex of) solution letter, tick up one white
    if ((guessArray[i]!==solutionArray[i])&&(solutionArray.indexOf(guessArray[i])!==(-1))) {
      whitePeg++;
      solutionArray[solutionArray.indexOf(guessArray[i])] = null;
    }
  }
  let redPegStr = redPeg.toString();
  let whitePegStr = whitePeg.toString();
  let hint = ((redPegStr.red)+"-"+(whitePegStr.white));
  //console.log("Hint: "+hint);
  board.push(hint+" --- "+guess);
  return hint;
}

/*
*This function checks the guess against the solution
*
* @param guess The user inputted guess
*/
function checkForWin(guess) {
  let win = "You guessed it!";
  let reguess = "Guess again.";
  let lose = "You ran out of turns! The solution was "+solution;
  if (solution===guess){
    console.log(win);
    return win;
  }else if ((solution!=guess)&&(board.length < 10)){
    console.log(reguess);
    return reguess;
  }else if ((solution!=guess)&&(board.length = 10)) {
    console.log(lose);
    return lose;
  }
}

/*
*This function runs the mastermind game
*
* @param guess The user inputted guess
*/
function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution
  generateHint(guess);
  //console.log(solution);
  checkForWin(guess);
}

/*
*This function prompts the user for an inputted guess
*/
function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      let expected = ('2'.red)+"-"+('2'.white);
      assert.equal(generateHint('abdc'), expected);
    });
    it('should generate hints if solution has duplicates', () => {
      let expected = ('1'.red)+"-"+('1'.white);
      assert.equal(generateHint('aabb'), expected);
    });

  });

} else {

  generateSolution();
  getPrompt();
}

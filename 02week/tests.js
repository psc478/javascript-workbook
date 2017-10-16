'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function rockPaperScissors(hand1, hand2) {
let h1 = hand1.toLowerCase().trim();
//console.log("h1 is "+h1);
let h2 = hand2.toLowerCase().trim();
//console.log("h2 is "+h2);
if ((h1===h2)&&
((h1==="paper")||(h1==="scissors")||(h1==="rock"))&&
((h2==="paper")||(h2==="scissors")||(h2==="rock"))){
  return "It's a tie!";
}else if (((h1==="scissors")&&(h2==="paper"))||
((h1==="paper")&&(h2==="rock"))||
((h1==="rock")&&(h2==="scissors"))){
  return "Hand one wins!";
}else if (((h2==="scissors")&&(h1==="paper"))||
((h2==="paper")&&(h1==="rock"))||
((h2==="rock")&&(h1==="scissors"))){
  return "Hand two wins!";
}else {
  return "SOMEBODY---not gonna name any names---but somebody had an invalid input.";
}
  // Write code here

}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {
//add null and nan to tests
  describe('#rockPaperScissors()', () => {
    it('Hand one should win', () => {
      assert.equal(rockPaperScissors('paper', 'rock'), "Hand one wins!");
      assert.equal(rockPaperScissors('scissors', 'paper'), "Hand one wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('Hand two should win', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('scissors', 'rock'), "Hand two wins!");
    });
    it('Should display to user that the input(s) are invalid', () => {
      assert.equal(rockPaperScissors('NaN', 'null'), "SOMEBODY---not gonna name any names---but somebody had an invalid input.");
      assert.equal(rockPaperScissors('what', 'SSORS'), "SOMEBODY---not gonna name any names---but somebody had an invalid input.");
      assert.equal(rockPaperScissors('rokc ', 'sCiSsOrs'), "SOMEBODY---not gonna name any names---but somebody had an invalid input.");
    });
  });
} else {

  getPrompt();

}

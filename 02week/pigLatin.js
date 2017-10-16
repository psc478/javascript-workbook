'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function pigLatin(word) {
  let word1 = word.toLowerCase().trim();
  let newWord;
  let vowels = ["a","e","i","o","u"];
  //let vowls_w_y = ["a","e","i","o","u","y"];
  let first_letter_vowel;
  let first_vowel;
  let midString = "";
  let vowel_after1_yes = false;

//loop to determine if there are any vowels after the first letter
  OUTER_LOOP1:  for (let j=1; j<word1.length; j++){
                for (let k=0; k<5; k++){
                  //console.log("Checking first letter '" + word1.charAt(j) + "' against vowel '" + vowels[k] + "'");
                  if (word1.charAt(j)==vowels[k]){
                    vowel_after1_yes=true;
                    break OUTER_LOOP1;
                  }
                }
              }

//determine whether the first letter is a vowel
  for (let i=0; i<5; i++){
    if (word1.charAt(0)===vowels[i]){
      first_letter_vowel = true;
    }
  }

//follow Pig Latin convention of word-that-starts-with-a-vowel-just-gets-"yay"-at-the-end
  if (first_letter_vowel===true){
    newWord = word1 + "yay";
  }else if (vowel_after1_yes===true) { //if vowel is not the first letter
    //console.log("This is a word with a vowel, but not the first letter");
    //determine where the first vowel is
    OUTER_LOOP2:  for (let j=1; j<word1.length; j++){
                  for (let k=0; k<5; k++){
                    if (word1.charAt(j)===vowels[k]){
                      first_vowel=j;
                      //console.log("The first vowel is at place " + j + " (where 0 is the first letter)");
                      break OUTER_LOOP2;
                    }
                  }
                }

    //reorder word and append "ay"
    let word1split = word1.split("");
    for (let ii=first_vowel; ii<word1.length; ii++){
      midString = midString + word1split[ii];
      //console.log("midString from first loop: " + midString);
    }
    for (let iii = 0; iii<first_vowel; iii++){
      midString = midString + word1split[iii];
      //console.log("midString from second loop: " + midString);
    }

    newWord = midString + "ay";

  }else {
    newWord = word1 + "yay"; //if no vowels
  }

  return newWord;

}


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}

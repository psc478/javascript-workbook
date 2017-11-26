'use strict';

const assert = require('assert');

let array = [1,2,3,4,5];

/*
*This function returns true if the input is even
*
* @param num the input number
*/
let evenFilter = function(num){
  return num%2 === 0;
};

/*
*This function returns true if the input is odd
*
* @param num the input number
*/
let oddFilter = function(num){
  return !evenFilter(num);
}

let expected = [2,4];

/*
*This function acts as the higher order function "filter," returning an array of values from the input array that satisfy the callback function
*
* @param arr the input array
* @param callback the function being implemented on the input array
*/
function myFilterImpl(arr, callback){
  let blank = [];
  for(let i=0; i<arr.length; i++){
    if ((callback(arr[i]))===true){
      blank.push(arr[i]);
    }
  }
  return blank;
}

let filtered = myFilterImpl(array, oddFilter);

console.log(filtered);

/*
*This function acts as the higher order function "map," returning an array of values where each value is the result of the callback function being implemented on the element of the input array
*
* @param arr the input array
* @param callback the function being implemented on the input array
*/
function myMapImpl(arr, callback){
  let mapped = [];
  for(let i=0; i<arr.length; i++){
    let mapelement = callback(arr[i]);
    mapped.push(mapelement);
  }
  return mapped;
}

/*
*This function converts numerical grades to their A-through-F equivalent letter grades
*
* @param num the numerical grade
*/
let gradeConverter = function(num){
  if ((num>=90)&&(num<=100)){
    return 'A';
  }else if((num>=80)&&(num<90)){
    return 'B';
  }else if((num>=75)&&(num<80)){
    return 'C';
  }else if((num>=70)&&(num<75)){
    return 'D';
  }else if(num<70){
    return 'F';
  }
}

let grades = [99,87,23,67,13,77];

let converted = myMapImpl(grades,gradeConverter);
console.log(converted);

/*
*This function detects whether the input number is positive
*
* @param num the number to be tested on whether is positive or negative
*/
let detectPositive = function(num){
  if(num>0){
    return true;
  }
}

/*
*This function acts as the higher order function "some," returning true if at least one element in the input array fulfills the callback's requirements
*
* @param arr the input array
* @param callback the function being implemented on the input array
*/
function mySomeImpl(arr, callback){
  for (let i=0; i<arr.length; i++){
    if (callback(arr[i])){
      return true;
    }
  }
  return false;
}

let someArray1 = [-1,-2,-3,-4,5];
let someArray2 =  [-1,-2,-3,-4,-5];
let PosArray1 = mySomeImpl(someArray1, detectPositive);
let PosArray2 = mySomeImpl(someArray2, detectPositive);
console.log("mySomeImpl test on array with 1 positive: "+PosArray1);
console.log("mySomeImpl test on array with 0 positives: "+PosArray2);


/*
*This function acts as the higher order function "forEach," implementing the callback function on each element of the input array
*
* @param arr the input array
* @param callback the function being implemented on the input array
*/
function myForEachImpl(arr, callback){
  for (let i=0; i<arr.length; i++){
    callback(arr[i]);
  }
}

let forEachArray = [1,2,3,4];

/*
*This function prints the input
*
* @param x what is being printed
*/
function Printing(x){
  console.log("Printing: "+x);
}

myForEachImpl(forEachArray, Printing);
/*
*This function acts as the higher order function "every," returning true if every element in the input array fulfills the callback's requirements
*
* @param arr the input array
* @param callback the function being implemented on the input array
*/
function myEveryImpl(arr, callback){
  for (let i=0; i<arr.length; i++){
    if (callback(arr[i])!=true){
      return false;
    }
  }
  return true;
}

let everyArray1 = [1,2,3,4,5];
let everyArray2 =  [1,2,3,-4,5];
let PosEvArray1 = myEveryImpl(everyArray1, detectPositive);
let PosEvArray2 = myEveryImpl(everyArray2, detectPositive);
console.log("myEveryImpl test on array with all positives: "+PosEvArray1);
console.log("myEveryImpl test on array with 1 negative: "+PosEvArray2);
///////////////////////////////////////////////////////////////////////////////////////////////////////
if (typeof describe === 'function') {

  describe('#forEach()', () => {
    it('should call the callback the array.length number of times', () => {
      let count = 0;
      myForEachImpl([1, 2, 3], () => {
        count++;
      });
      assert.equal(count, 3);
    });
  });

  describe('#map()', () => {
    const arr = [1, 2, 3];
    const mapped = myMapImpl(arr, (num) => {
      return num * num;
    });
    it('should return new array with mapped items', () => {
      assert.deepEqual(mapped, [1, 4, 9]);
    });
    it('should not affect the original array', () => {
      assert.deepEqual(arr, [1, 2, 3]);
    })
  });

  describe('#filter()', () => {
    it('should return an array of items that pass the predicate test', () => {
      const filtered = myFilterImpl([1, 2, 3], (num) => {
        return num % 2 === 0;
      });
      assert.deepEqual(filtered, [2]);
    });
  });

  describe('#some()', () => {
    let count = 0;
    const somed = mySomeImpl([1, 2, 3, 4], (num) => {
      count++;
      return num % 2 === 0;
    });
    it('should return true if at least one item passes the predicate test', () => {
      assert.equal(somed, true);
    });
    it('should stop at the first item that passes the predicate test', () => {
      assert.equal(count, 2);
    });
    it('should return false if no items pass the predicate test', () => {
      const somed = mySomeImpl([1, 3, 5], (num) => {
        return num % 2 === 0;
      });
      assert.equal(somed, false);
    });
  });

  describe('#every()', () => {
    it('should return true if at all passes the predicate test', () => {
      const everied = myEveryImpl([2, 4, 6], (num) => {
        return num % 2 === 0;
      });
      assert.equal(everied, true);
    });
    let count = 0;
    const everied = myEveryImpl([2, 3, 4, 5], (num) => {
      count++;
      return num % 2 === 0;
    });
    it('should return false if any item fails the predicate test', () => {
      assert.equal(everied, false);
    });
    it('should stop at the first item that fails the predicate test', () => {
      assert.equal(count, 2);
    });
  });

} else {

  console.log('Only run the tests on this one!')

}

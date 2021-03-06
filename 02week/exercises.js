let cars = ['Ford','Lamborghini','Ferrari','Yamaha'];
console.log('Cars array: ' + cars);
let moreCars = ['Hyundai','Mercedes','Toyota','Honda'];
console.log('moreCars array: ' + moreCars);
let totalCars = cars.concat(moreCars);
console.log('totalCars array: ' + totalCars);
console.log('Location of Honda: ' + totalCars.indexOf('Honda'));
console.log('Location of Ford: ' + totalCars.lastIndexOf('Ford'));
let stringOfCars = totalCars.join();
console.log('stringOfCars: ' + stringOfCars);
totalCars = stringOfCars.split(',');
console.log('Reconstituted "totalCars": ' + totalCars);
let carsInReverse = totalCars.reverse();
console.log('carsInReverse: ' + carsInReverse);
console.log('Cars Alphabetized: ' + carsInReverse.sort());
//alert(carsInReverse.indexOf('Ford'));  This line of code is copy+pasted from the textbook but generates an error
sliceHonda = carsInReverse.slice(0,1);
sliceFord = carsInReverse.slice(7,8);
removedCars = sliceHonda.concat(sliceFord);
console.log('RemovedCars: ' + removedCars);
console.log('Sliced carsInReverse: ' + carsInReverse);
carsInReverse.splice(1,2,removedCars[0],removedCars[1]);
console.log('Spliced carsInReverse: ' + carsInReverse);
carsInReverse.push('Toyota');
carsInReverse.push('Mercedes');
console.log('Pushed carsInReverse: ' + carsInReverse);
let popped = carsInReverse.pop();
console.log('Popped: ' + popped);
let shifted = carsInReverse.shift();
console.log('Shifted: ' + shifted);
carsInReverse.unshift('Chevy');
console.log('Final carsInReverse: ' + carsInReverse);
let numbers = [23,45,0,2];
numbers.forEach(function(element,index) {
  element = element + 2;
  numbers.splice(index,1,element);
});
console.log('Numbers: ' + numbers);

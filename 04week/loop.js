let whileCounter = 1;
let doWhileCounter = 1;
let carsInReverse = ['Hyundai','Mercedes','Toyota','Honda'];
let persons = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female"
}

for (let i=0; i<carsInReverse.length;i++){
  console.log(carsInReverse[i]);
}

//let personsKeys = Object.keys(persons);
for (let j in persons) {
  console.log(j);
}

for (let k in persons) {
  if (k==='birthDate'){
    console.log(persons[k]);
    break;
  }
}

while (whileCounter<5){
  console.log(whileCounter);
  whileCounter++;
}

do {
  console.log(doWhileCounter);
  doWhileCounter++;
} while (doWhileCounter < 5);

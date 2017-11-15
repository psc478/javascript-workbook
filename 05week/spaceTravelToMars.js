'use strict';

let assert = require('assert');

let good2go = null;

let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

class CrewMember {
  constructor(name, job, specialSkill){
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null;
  }
  enterShip(x){
    this.ship = x;
    x.crew.push(this);
  }
}

class Ship {
  constructor(name, type, ability){
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
  }
  missionStatement() { //This function returns the mission of the ship if properly crewed and "Can't perform a mission yet." if not
    console.log("Begin Mission Statement");
    //console.log("Ship Type: "+(this.type));
    for (let i=0; i<this.crew.length; i++){
      let crewMemberJob = this.crew[i].job;
      console.log("Crew Member Job Type: "+(jobTypes[crewMemberJob]));
      if (((jobTypes[crewMemberJob])==(this.type))||(this.crew[i].job=='programmer')){
        good2go = true;
      }
    }
    if (good2go==true){
      //console.log(this.ability);
      good2go=null; //need to reset because good2go is a global variable
      return this.ability;
    }else{
      //console.log("Can't perform a mission yet.");
      return "Can't perform a mission yet."
    }
  } // returns the ship's ability as a string if there is a crewmember whose job matches the ship, otherwise should return "Can't perform a mission yet."
}

/*
*
* Test code to verify everything works. Everything works as of 8:55PM CT 2017-11-3.
*
let TestCrew = new CrewMember('Joe Doe', 'programmer', 'botany');
let TestShip = new Ship('Janus','Repair Ship','Start shoveling bodies.');
TestShip.missionStatement();
TestCrew.enterShip(TestShip);
console.log(TestShip.crew[0]);
let crewMemberJob = TestShip.crew[0].job;
console.log("Crew Member Job Type: "+crewMemberJob);
TestShip.missionStatement();
*/



//tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}

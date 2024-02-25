//Step 1
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Step 2:
const pAequorFactory = (num, dnaArr) => {
  return {
    specimenNum: num,
    dna: dnaArr,
    mutate() {
      //Step 3: creating a random base in the object's dna property to change the current base to a different base
      let randomBase = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while (this.dna[randomBase] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomBase] = newBase;
      return this.dna;
    },

    //Step 4
    compareDna(otherPaequor) {
      let counter = 0;
      // to compare the DNA sequence
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPaequor.dna[i]) {
          counter++;
        }
      }
      //Calculate their similarities: To calculate the percentage, take the
      //number of identical bases, dividedby the total number of bases and
      //multiply the result by 100
      const similar = (counter / this.dna.length) * 100;
      //using .toFixed() method to limit the number of the decimal places
      const similarities = similar.toFixed(2);
      console.log(
        `specimen #1 and specimen #2 have ${similarities}% DNA in common`
      );
    },

    //Step 5
    // A method to determine if the P.aequor qill survive, if either the 'C' base or 'G' base make up > 60% of the bases
    willLikelySurvive() {
      let counter = 0;
      this.dna.forEach((base) => {
        if (base === "C" || base === "G") {
          return counter++;
        }
      });

      if (counter / this.dna.length > 0.6) {
        return true;
      } else {
        return false;
      }
    },
  };
};
//Step 6:

//Create an array to store the instances
let survivingSpecimen = [];
let idCounter = 1;

// to generate 30 instances and add them to the array
while (survivingSpecimen.length < 30) {
  let pAequor = pAequorFactory(idCounter, mockUpStrand());
  if (pAequor.willLikelySurvive()) {
    survivingSpecimen.push(pAequor);
  }
  idCounter++;
}

console.log(survivingSpecimen);

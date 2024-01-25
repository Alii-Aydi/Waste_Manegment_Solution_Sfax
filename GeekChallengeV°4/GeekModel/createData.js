const fs = require("fs");

function createCanData(numCans, numDays) {
  let data = "Can ID,Population,Commercial,Nbr of Houses";
  for (let i = 1; i <= numDays; i++) {
    data += `,Day ${i}`;
  }
  data += "\n";

  for (let i = 1; i <= numCans; i++) {
    const population = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
    const commercial = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    const nbrHouses = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
    const dayData = [];
    for (let j = 0; j < numDays; j++) {
      dayData.push(Math.round(Math.random()));
    }
    data += `${i},${population},${commercial},${nbrHouses},${dayData.join(
      ","
    )}\n`;
  }

  fs.writeFileSync("cans.csv", data);
  console.log("Data created successfully!");
}

createCanData(6600, 7);

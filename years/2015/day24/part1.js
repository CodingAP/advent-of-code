const input = require('fs').readFileSync('./years/2015/day24/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    // let weights = common.parseListToInt(input);
    // let allWeights = common.permutator(weights);

    // let totalWeight = 0;
    // weights.forEach(element => { totalWeight += element });
    // let eachSide = totalWeight / 3;
    // let workingWeights = [];

    // for (let k = 0; k < allWeights.length; k++) {
    //     for (let i = 1; i < allWeights[k].length; i++) {
    //         for (let j = 0; j < allWeights[k].length - i + 1; j++) {
    //             let certainWeights = allWeights[k].slice(j, j + i);
    //             let sum = common.addAll(certainWeights);
    //             if (sum == eachSide) {
    //                 let alreadyInThere = true;
    //                 for (let l = 0; l < workingWeights.length; l++) {
    //                     if (common.arraysEqual(workingWeights[l], certainWeights, false)) alreadyInThere = false;
    //                 }
    //                 if (!alreadyInThere) workingWeights.push(certainWeights);
    //             }
    //         }
    //     }
    // }

    // console.log(workingWeights);
    return 0;
}
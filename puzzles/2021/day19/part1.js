const common = require('../../../scripts/common');

module.exports = input => {
    let scannerPoints = [];
    let scanners = input.split('\n\n');
    let totalBeacons = 0;

    scanners.forEach((element, index) => {
        let lines = element.split('\n');
        scannerPoints[index] = [];
        for (let i = 1; i < lines.length; i++) {
            let [x, y, z] = lines[i].split(',').map(num => parseInt(num));
            scannerPoints[index].push({ x, y, z });
            totalBeacons++;
        }
    });

    let getAllRotations = point => {
        let allArrangements = common.permutator(Object.values(point));
        let all = [];

        for (let x = -1; x <= 1; x += 2) {
            for (let y = -1; y <= 1; y += 2) {
                for (let z = -1; z <= 1; z += 2) {
                    for (let i = 0; i < allArrangements.length; i++) {
                        all.push({ x: allArrangements[i][0] * x, y: allArrangements[i][1] * y, z: allArrangements[i][2] * z });
                    }
                }
            }
        }
        return all;
    }

    let findCommonBeacons = (scannerA, scannerB) => {
        let scannerADistances = [];
        for (let i = 0; i < scannerPoints[scannerA].length; i++) {
            let distances = [];
            for (let j = 0; j < scannerPoints[scannerA].length; j++) {
                if (i == j) continue;
                distances.push(Math.abs(scannerPoints[scannerA][i].x - scannerPoints[scannerA][j].x) + Math.abs(scannerPoints[scannerA][i].y - scannerPoints[scannerA][j].y) + Math.abs(scannerPoints[scannerA][i].z - scannerPoints[scannerA][j].z));
            }
            scannerADistances.push(distances);
        }

        let scannerBDistances = [];
        for (let i = 0; i < scannerPoints[scannerB].length; i++) {
            let distances = [];
            for (let j = 0; j < scannerPoints[scannerB].length; j++) {
                if (i == j) continue;
                distances.push(Math.abs(scannerPoints[scannerB][i].x - scannerPoints[scannerB][j].x) + Math.abs(scannerPoints[scannerB][i].y - scannerPoints[scannerB][j].y) + Math.abs(scannerPoints[scannerB][i].z - scannerPoints[scannerB][j].z));
            }
            scannerBDistances.push(distances);
        }

        let pairings = [];
        for (let i = 0; i < scannerADistances.length; i++) {
            for (let j = 0; j < scannerBDistances.length; j++) {
                let count = 0;
                for (let k = 0; k < scannerADistances[i].length; k++) {
                    if (scannerBDistances[j].includes(scannerADistances[i][k])) count++;
                }
                if (count >= 11) pairings.push([i, j]);
            }
        }

        return pairings;
    }

    let matched = {};
    for (let i = 0; i < scannerPoints.length; i++) {
        for (let j = 0; j < scannerPoints.length; j++) {
            if (i == j) continue;
            let pairings = findCommonBeacons(i, j);
            if (pairings.length >= 12) {
                if (matched[j] && matched[j].includes(i)) continue;
                if (!matched[i]) matched[i] = [];
                matched[i].push(j);

                if (!matched[j]) matched[j] = [];
                matched[j].push(i); 
            }
        }
    }

    let processedScannerPoints = [
        {
            position: { x: 0, y: 0, z: 0 },
            beacons: scannerPoints[0]
        }
    ];

    let done = [0];

    for (let i = 0; i < matched['0'].length; i++) {
        let other = matched[matched['0'][i]];
        matched[matched['0'][i]] = other.filter(element => !done.includes(element));
    }

    let unprocessed = matched['0'];
    while (unprocessed.length > 0) {
        let needsProcessing = unprocessed.shift();

        let allPossible = common.copy(scannerPoints[needsProcessing]).map(element => getAllRotations(element));
        
        break;
    }
}
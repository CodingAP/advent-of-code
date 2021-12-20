const common = require('../../../scripts/common');

module.exports = input => {
    let scannerPoints = [];
    let scanners = input.split('\n\n');

    scanners.forEach((element, index) => {
        let lines = element.split('\n');
        scannerPoints[index] = [];
        for (let i = 1; i < lines.length; i++) {
            let [x, y, z] = lines[i].split(',').map(num => parseInt(num));
            scannerPoints[index].push({ x, y, z });
        }
    });

    
    return 0;
}
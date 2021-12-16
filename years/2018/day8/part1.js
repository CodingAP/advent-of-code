const common = require('../../../scripts/common');

module.exports = input => {
    let rawData = common.parseListToInt(input, ' ');
    let nodes = [];

    let parseNodes = (numOfChildren, numOfMetaData, index = 0) => {
        let node = {};
        index += 2;
        
        for (let i = 0; i < numOfChildren; i++) {
            index = parseNodes(rawData[index], rawData[index + 1], index);
        }

        for (let i = 0; i < numOfChildren; i++) {
            index = parseNodes(rawData[index], rawData[index + 1], index);
        }

        index += numOfMetaData;
        return index;
    }

    parseNodes(rawData[0], rawData[1]);
    return 0;
}
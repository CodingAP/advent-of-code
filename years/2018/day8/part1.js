const common = require('../../../scripts/common');

module.exports = input => {
    let rawData = common.parseListToInt(input, ' ');

    let parseNodes = (childNodes, metaData, index) => {
        let node = { children: [], metaData: [], length: 0 };
        for (let i = 0; i < childNodes; i++) {
            index += 2;
            let childNode = parseNodes(rawData[index], rawData[index + 1], index);
            node.length += childNode.length;
            index += childNode.length;
            node.children.push(childNode);
        }
        index += 2;

        for (let i = 0; i < metaData; i++) {
            node.metaData.push(rawData[index + i]);
        }

        node.length += metaData;
        index += metaData;

        return node;
    }

    let nodes = parseNodes(rawData[0], rawData[1], 0);
    console.log(nodes.children);
    return 0;
}
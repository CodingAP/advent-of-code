const common = require('../../../scripts/common');

module.exports = input => {
    let nodes = [];
    let df = input.split('\n');
    for (let i = 0; i < df.length; i++) {
        if (i <= 1) continue;
        let tokens = df[i].split(' ').filter(value => value != '');

        let position = { x: parseInt(tokens[0].split('-')[1].replace('x', '')), y: parseInt(tokens[0].split('-')[2].replace('y', '')) };
        let size = parseInt(tokens[1].replace('T', ''));
        let used = parseInt(tokens[2].replace('T', ''));

        nodes.push({ position, size, used });
    }
    console.log(nodes[nodes.length - 1]);

    let grid = common.create2DArray(29, 34);

    let blank = { x: -1, y: -1 };
    for (let i = 0; i < nodes.length; i++) {
        
    }
}
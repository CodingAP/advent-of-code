const common = require('../../../scripts/common');
const input = common.readInput('./years/2020/day24/input.txt');

module.exports = () => {
    let grid = {};
    
    let positions = {
        e: { x: 1, y: 0 },
        ne: { x: 0.5, y: 1 },
        nw: { x: -0.5, y: 1 },
        w: { x: -1, y: 0 },
        se: { x: 0.5, y: -1 },
        sw: { x: -0.5, y: -1 },
    }
    
    input.split(/\n/).forEach(value => {
        let currentPosition = { x: 0, y: 0 };
        for (let i = 0; i < value.length; i++) {
            let current = value.charAt(i);
            let next = value.charAt(i + 1) || '';
            
            if (positions[current + next]) {
                currentPosition.x += positions[current + next].x;
                currentPosition.y += positions[current + next].y;
                i++;
            } else if (positions[current]) {
                currentPosition.x += positions[current].x;
                currentPosition.y += positions[current].y;
            }
        }
        
        if (!grid[currentPosition.x + ',' + currentPosition.y]) grid[currentPosition.x + ',' + currentPosition.y] = false;
        grid[currentPosition.x + ',' + currentPosition.y] = !grid[currentPosition.x + ',' + currentPosition.y];
    });
    
    return Object.entries(grid).filter(value => value[1]).length;
}
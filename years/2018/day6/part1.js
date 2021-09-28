const common = require('../../../scripts/common');

const common = require('../../../scripts/common');

module.exports = input => {
    let points = [];
    
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    input.split(/\r\n/).forEach(value => {
        let [x, y] = value.replace(/\s/g, '').split(/,/).map(value => parseInt(value));
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        points.push({ x, y });
    });
    
    let findClosest = point => {
        let closest = Infinity;
        let allPoints = [];
        for (let i = 0; i < points.length; i++) {
            let distance = Math.abs(points[i].x - point.x) + Math.abs(points[i].y - point.y);
            if (distance < closest) {
                allPoints = [i];
                closest = distance;
            } else if (distance == closest) {
                allPoints.push(i);
            }
        }
        return { points: allPoints, distance: closest };
    }
    
    minX--; maxX++; minY--; maxY++;
    let areas = [];
    let infinite = [];
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            let closeInfo = findClosest({ x, y });
            if (closeInfo.points.length == 1) {
                if (areas[closeInfo.points[0]] == null) areas[closeInfo.points[0]] = 0;
                areas[closeInfo.points[0]]++;
                
                if ((x == minX || x == maxX || y == minY || y == maxY) &&
                    !infinite.includes(closeInfo.points[0])) infinite.push(closeInfo.points[0]);
            }
        }
    }
    
    let largest = -Infinity;
    for (let i = 0; i < areas.length; i++) {
        if (infinite.includes(i)) continue;
        if (areas[i] > largest) largest = areas[i];
    }
    
    return largest;
}
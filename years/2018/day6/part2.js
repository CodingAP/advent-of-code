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

    let findAll = point => {
        let allDistances = [];
        for (let i = 0; i < points.length; i++) {
            allDistances.push(Math.abs(points[i].x - point.x) + Math.abs(points[i].y - point.y));
        }
        return allDistances;
    }

    minX--; maxX++; minY--; maxY++;
    let area = 0;
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            let closeInfo = findAll({ x, y });
            if (common.addAll(closeInfo) < 10000) area++;
        }
    }
    return area;
}
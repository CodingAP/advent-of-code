module.exports = input => {
    let instructions = input.split('\n');
    let wires = [];

    for (let i = 0; i < instructions.length; i++) {
        let directions = instructions[i].split(',');
        let position = { x: 0, y: 0 };
        wires[i] = [{ x: 0, y: 0 }];
        for (let j = 0; j < directions.length; j++) {
            let direction = directions[j][0];
            let length = parseInt(directions[j].slice(1));
            switch (direction) {
                case 'U':
                    position.y += length;
                    break;
                case 'D':
                    position.y -= length;
                    break;
                case 'L':
                    position.x -= length;
                    break;
                case 'R':
                    position.x += length;
                    break;
            }
            wires[i].push({ x: position.x, y: position.y });
        }
    }

    let lineIntersection = (point1, point2, point3, point4) => {
        let denominator = (((point1.x - point2.x) * (point3.y - point4.y)) - ((point1.y - point2.y) * (point3.x - point4.x)));

        if (denominator == 0) return null;
        let t = (((point1.x - point3.x) * (point3.y - point4.y)) - ((point1.y - point3.y) * (point3.x - point4.x))) / denominator;
        let u = (((point2.x - point1.x) * (point1.y - point3.y)) - ((point2.y - point1.y) * (point1.x - point3.x))) / denominator;

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            let x = point1.x + t * (point2.x - point1.x);
            let y = point1.y + t * (point2.y - point1.y);
            return { x, y };
        }
        return null;
    }

    let intersectionSteps = [];
    let steps1 = 0, steps2 = 0;
    for (let i = 1; i < wires[0].length; i++) {
        for (let j = 1; j < wires[1].length; j++) {
            let point = lineIntersection(wires[0][i - 1], wires[0][i], wires[1][j - 1], wires[1][j]);
            if (point && point.x != 0 && point.y != 0) intersectionSteps.push(steps1 + (Math.abs(wires[0][i - 1].x - point.x) + Math.abs(wires[0][i - 1].y - point.y)) + steps2 + (Math.abs(wires[1][j - 1].x - point.x) + Math.abs(wires[1][j - 1].y - point.y)));

            steps2 += Math.abs(wires[1][j].x - wires[1][j - 1].x) + Math.abs(wires[1][j].y - wires[1][j - 1].y);
        }
        steps2 = 0;
        steps1 += Math.abs(wires[0][i].x - wires[0][i - 1].x) + Math.abs(wires[0][i].y - wires[0][i - 1].y);
    }
    return intersectionSteps.reduce((keep, element) => Math.min(element, keep));
}
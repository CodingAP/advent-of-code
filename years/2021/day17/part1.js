module.exports = input => {
    let tokens = input.split(' ');
    let xRange = tokens[2].replace(',', '').split('=')[1].split('..').map(element => parseInt(element));
    let yRange = tokens[3].replace(',', '').split('=')[1].split('..').map(element => parseInt(element));
    let targetArea = { startX: xRange[0], endX: xRange[1], startY: yRange[0], endY: yRange[1] };

    let bestY = -Infinity;

    for (let y = 1; y <= 500; y++) {
        for (let x = 1; x <= 500; x++) {
            let position = { x: 0, y: 0 };
            let velocity = { x: x, y: y };

            let inTarget = false;

            for (let i = 0; i < 1000; i++) {
                position.x += velocity.x;
                position.y += velocity.y;

                if (position.x >= targetArea.startX && position.x <= targetArea.endX && position.y >= targetArea.startY && position.y <= targetArea.endY) inTarget = true;

                velocity.x += -Math.sign(velocity.x);
                velocity.y--;
            }

            if (inTarget) bestY = Math.max(bestY, y);
        }
    }

    return bestY * (bestY + 1) / 2;
}
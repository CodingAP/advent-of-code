module.exports = input => {
    let previousPositions = [];
    let position = { x: 0, y: 0 };
    let currentDirection = 0;
    let directions = input.replace(/\s/g, '').split(',');
    for (let i = 0; i < directions.length; i++) {
        if (directions[i].charAt(0) == 'L') {
            currentDirection--;
        } else if (directions[i].charAt(0) == 'R') {
            currentDirection++;
        }

        if (currentDirection > 3) currentDirection = 0;
        if (currentDirection < 0) currentDirection = 3;

        for (let j = 0; j < parseInt(directions[i].slice(1)); j++) {
            switch (currentDirection) {
                case 0:
                    position.y++;
                    break;
                case 1:
                    position.x++;
                    break;
                case 2:
                    position.y--;
                    break;
                case 3:
                    position.x--;
                    break;
            }

            let positionString = position.x + ',' + position.y;
            if (previousPositions.includes(positionString)) {
                return Math.abs(position.x) + Math.abs(position.y);
            } else {
                previousPositions.push(positionString);
            }
        }
    }
}
const pieces = [
    [['#', '#', '#', '#']],

    [[' ', '#', ' '],
    ['#', '#', '#'],
    [' ', '#', ' ']],

    [[' ', ' ', '#'],
    [' ', ' ', '#'],
    ['#', '#', '#']],

    [['#'],
    ['#'],
    ['#'],
    ['#']],

    [['#', '#'],
    ['#', '#']],
];

const getHeight = arena => ([...arena].map(coord => parseInt(coord.split(',')[1])).reduce((max, height) => Math.max(max, height), -1) + 1);
const showArena = (arena, width) => {
    let maxY = getHeight(arena);
    for (let y = maxY; y >= 0; y--) {
        let row = '';
        for (let x = 0; x < width; x++) row += arena.has(`${x},${y}`) ? '#' : '.';
        console.log(row);
    }
}

const part1 = async input => {
    let currentPiece = { position: { x: 0, y: 0 }, type: -1 };
    let pieceCount = 0, moveIndex = 0;
    let arena = new Set(), width = 7;
    while (pieceCount < 2022) {
        currentPiece.type = (currentPiece.type + 1) % pieces.length;
        let highest = getHeight(arena);
        currentPiece.position = { x: 2, y: highest + 3 + pieces[currentPiece.type].length - 1 };

        while (true) {
            let move = (input[moveIndex] == '>') ? 1 : -1;
            moveIndex = (moveIndex + 1) % input.length;

            let xCollision = false;
            for (let y = 0; y < pieces[currentPiece.type].length; y++) {
                for (let x = 0; x < pieces[currentPiece.type][y].length; x++) {
                    if (pieces[currentPiece.type][y][x] != '#') continue;

                    if (currentPiece.position.x + x + move < 0 || currentPiece.position.x + x + move >= width || arena.has(`${currentPiece.position.x + x + move},${currentPiece.position.y - y}`)) xCollision = true;
                }
            }

            if (!xCollision) currentPiece.position.x += move;
            
            let yCollision = false;
            for (let y = 0; y < pieces[currentPiece.type].length; y++) {
                for (let x = 0; x < pieces[currentPiece.type][y].length; x++) {
                    if (pieces[currentPiece.type][y][x] != '#') continue;

                    if (currentPiece.position.y - y - 1 < 0 || arena.has(`${currentPiece.position.x + x},${currentPiece.position.y - y - 1}`)) yCollision = true;
                }
            }

            if (yCollision) break;
            else currentPiece.position.y--;
        }

        for (let y = 0; y < pieces[currentPiece.type].length; y++) {
            for (let x = 0; x < pieces[currentPiece.type][y].length; x++) {
                if (pieces[currentPiece.type][y][x] != '#') continue;
                arena.add(`${currentPiece.position.x + x},${currentPiece.position.y - y}`);
            }
        }

        pieceCount++;
    }

    return getHeight(arena);
}

const part2 = async input => {
    let currentPiece = { position: { x: 0, y: 0 }, type: -1 };
    let pieceCount = 0, moveIndex = 0, width = 7, amountOfRocks = 1e12;
    let arena = new Set(), previousStates = {};
    let addedHeight = 0;

    while (pieceCount < amountOfRocks) {
        currentPiece.type = (currentPiece.type + 1) % pieces.length;
        let highest = getHeight(arena);
        currentPiece.position = { x: 2, y: highest + 3 + pieces[currentPiece.type].length - 1 };

        while (true) {
            let move = (input[moveIndex] == '>') ? 1 : -1;
            moveIndex = (moveIndex + 1) % input.length;

            let xCollision = false;
            for (let y = 0; y < pieces[currentPiece.type].length; y++) {
                for (let x = 0; x < pieces[currentPiece.type][y].length; x++) {
                    if (pieces[currentPiece.type][y][x] != '#') continue;

                    if (currentPiece.position.x + x + move < 0 || currentPiece.position.x + x + move >= width || arena.has(`${currentPiece.position.x + x + move},${currentPiece.position.y - y}`)) xCollision = true;
                }
            }

            if (!xCollision) currentPiece.position.x += move;

            let yCollision = false;
            for (let y = 0; y < pieces[currentPiece.type].length; y++) {
                for (let x = 0; x < pieces[currentPiece.type][y].length; x++) {
                    if (pieces[currentPiece.type][y][x] != '#') continue;

                    if (currentPiece.position.y - y - 1 < 0 || arena.has(`${currentPiece.position.x + x},${currentPiece.position.y - y - 1}`)) yCollision = true;
                }
            }

            if (yCollision) break;
            else currentPiece.position.y--;
        }

        for (let y = 0; y < pieces[currentPiece.type].length; y++) {
            for (let x = 0; x < pieces[currentPiece.type][y].length; x++) {
                if (pieces[currentPiece.type][y][x] != '#') continue;
                arena.add(`${currentPiece.position.x + x},${currentPiece.position.y - y}`);
            }
        }

        // check if we have been here before
        let state = `${moveIndex},${currentPiece.type},`;
        for (let y = highest; y >= highest - 10; y--) {
            let rownum = '';
            for (let x = 0; x < width; x++) rownum += arena.has(`${x},${y}`) ? 1 : 0;
            state += parseInt(rownum, 2) + ',';
        }

        if (previousStates[state] != null) {
            let pieceCountChange = pieceCount - previousStates[state].pieceCount;
            let heightChange = getHeight(arena) - previousStates[state].height;
            
            let cycleAmount = Math.floor((amountOfRocks - previousStates[state].pieceCount) / pieceCountChange) - 1;
            addedHeight += cycleAmount * heightChange;
            pieceCount += cycleAmount * pieceCountChange;
        } else previousStates[state] = { height: getHeight(arena), pieceCount };
        pieceCount++;
    }

    return addedHeight + getHeight(arena);
}

export { part1, part2 };
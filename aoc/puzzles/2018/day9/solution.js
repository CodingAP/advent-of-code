const part1 = async input => {
    let tokens = input.split(' ');
    let players = new Array(parseInt(tokens[0])).fill(0), last = parseInt(tokens[6]);
    let marbles = [0];

    let rotate = amount => {
        if (amount == 0) return;
        else if (amount > 0) for (let i = 0; i < amount; i++) marbles.unshift(marbles.pop());
        else for (let i = 0; i < Math.abs(amount); i++) marbles.push(marbles.shift());
    };

    for (let i = 1; i <= last; i++) {
        if (i % 23 == 0) {
            rotate(-7);
            players[(i - 1) % players.length] += marbles.pop() + i;
        } else {
            rotate(2);
            marbles.push(i);
        }
    }
    
    return players.reduce((max, player) => Math.max(max, player), -Infinity);
}

const part2 = async input => {
    let tokens = input.split(' ');
    let players = new Array(parseInt(tokens[0])).fill(0), last = parseInt(tokens[6]) * 100;
    let marbles = { value: 0, next: null, previous: null };
    marbles.previous = marbles;
    marbles.next = marbles;

    for (let i = 1; i <= last; i++) {
        if (i % 23 == 0) {
            for (let rotate = 0; rotate < 7; rotate++) marbles = marbles.previous;
            players[(i - 1) % players.length] += marbles.value + i;

            marbles.next.prev = marbles.prev;
            marbles.prev.next = marbles.next;
            marbles = marbles.next;
        } else {
            let newMarble = { value: i, previous: marbles.next, next: marbles.next.next };
            marbles.next.next.prev = newMarble;
            marbles.next.next = newMarble;
            marbles = newMarble;
        }
    }

    return players.reduce((max, player) => Math.max(max, player), -Infinity);
}

export { part1, part2 };
const part1 = async input => {
    return input.split('\n').reduce((acc, seat) => {
        let row = parseInt(seat.slice(0, 7).replace(/[B]/g, '1').replace(/[F]/g, '0'), 2);
        let col = parseInt(seat.slice(7).replace(/[R]/g, '1').replace(/[L]/g, '0'), 2);
        return Math.max(acc, row * 8 + col);
    }, -Infinity);
}

const part2 = async input => {
    let seatNumbers = [];
    input.split('\n').map(seat => {
        let row = parseInt(seat.slice(0, 7).replace(/[B]/g, '1').replace(/[F]/g, '0'), 2);
        let col = parseInt(seat.slice(7).replace(/[R]/g, '1').replace(/[L]/g, '0'), 2);
        return row * 8 + col;
    }).forEach(element => seatNumbers[element] = true);

    for (let i = 0; i < seatNumbers.length; i++) {
        if (seatNumbers[i - 1] && seatNumbers[i] == null && seatNumbers[i + 1]) return i;
    }
}

export { part1, part2 }; 
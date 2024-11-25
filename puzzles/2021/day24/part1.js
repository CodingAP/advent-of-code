const common = require('../../../scripts/common');

module.exports = input => {
    let runProgram = number => {
        let numbers = [
            [1, 14, 12], [1, 10, 9],
            [1, 13, 8], [26, -8, 3],
            [1, 11, 0], [1, 11, 11],
            [1, 14, 10], [26, -11, 13],
            [1, 14, 3], [26, -1, 10],
            [26, -8, 10], [26, -5, 14],
            [26, -16, 6], [26, -6, 5]
        ];

        let digits = number.toString().split('').map(element => parseInt(element));

        let z = 0;
        for (let i = 0; i < digits.length; i++) {
            let currentNumbers = numbers[i];
            let w = digits[i];
            let x = Math.floor((z % 26) / currentNumbers[0]) + currentNumbers[1];
            x = (x == w) ? 0 : 1;
            
            let y = (25 * x) + 1;
            z *= y;

            y = (w + currentNumbers[2]) * x;
            z += y;
            console.log(z);
        }

        return z;
    }

    let groups = common.readFile('./years/2021/day24/comparing.txt').split('\n\n');
    let numbers = [];
    groups.forEach(element => {
        let lines = element.split('\n');

        let number = [];
        number.push(lines[4].split(' ')[2]);
        number.push(lines[5].split(' ')[2]);
        number.push(lines[15].split(' ')[2]);
        numbers.push(number.map(element => parseInt(element)));
    });

    console.log(numbers);

    console.log(runProgram(11111111111111))
    // for (let i = 99999999999999; i >= 0; i--) {
    //     if (i.toString().includes('0')) continue;
    //     if (runProgram(i)) return i;
    //     console.log(i);
    // }
}
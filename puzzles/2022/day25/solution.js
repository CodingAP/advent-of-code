const part1 = async input => {
    let conversion = {
        0: 0,
        1: 1,
        2: 2,
        '-': -1,
        '=': -2
    }

    let numbers = input.split('\n').map(line => {
        let number = 0;
        let digit = 0;
        for (let i = line.length - 1; i >= 0; i--) {
            number += conversion[line[i]] * Math.pow(5, digit);
            digit++;
        }
        return number;
    });

    let sum = numbers.reduce((acc, num) => acc + num, 0);
    
    let convertToSNAFU = number => {
        if (number == 0) return '';
        let nextDigit = number % 5;
        let entries = Object.entries(conversion)
        for (let i = 0; i < entries.length; i++) {
            if ((entries[i][1] + 5) % 5 == nextDigit) {
                let newDigit = Math.floor((number - entries[i][1]) / 5);
                return convertToSNAFU(newDigit) + entries[i][0];
            }
        }
        return '';
    }
    
    return convertToSNAFU(sum);
}

const part2 = async input => {
    return '2022 DONE!';
}

export { part1, part2 };
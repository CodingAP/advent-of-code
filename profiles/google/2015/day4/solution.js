import crypto from 'crypto';

const part1 = async input => {
    let i = 0;
    while (true) {
        let string = crypto.createHash('md5').update(input + i).digest('hex');
        if (string.startsWith('00000')) break;
        i++;
    }
    
    return i;
}

const part2 = async input => {
    let i = 0;
    while (true) {
        let string = crypto.createHash('md5').update(input + i).digest('hex');
        if (string.startsWith('000000')) break;
        i++;
    }

    return i;
}

export { part1, part2 }; 
import crypto from 'crypto';

const common = {
    md5: input => crypto.createHash('md5').update(input).digest('hex')
}

const part1 = async input => {
    let i = 0;

    while (true) {
        let hash = common.md5(input + i);
        if (hash.startsWith('00000')) break;
        i++;
    }

    return i;
}

const part2 = async input => {
    let i = 0;

    while (true) {
        let hash = common.md5(input + i);
        if (hash.startsWith('000000')) break;
        i++;
    }

    return i;
}

export { part1, part2 };
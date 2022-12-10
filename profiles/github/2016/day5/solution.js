import crypto from 'crypto';

const part1 = async input => {
    let password = '';
    let i = 0;
    while (password.length != 8) {
        let md5 = crypto.createHash('md5').update(input + i).digest('hex');
        if (md5.startsWith('00000')) password += md5[5];
        i++;
    }
    return password;
}

const part2 = async input => {
    let password = new Array(8).fill(null);
    let i = 0;
    while (password.filter(element => element != null).length != 8) {
        let md5 = crypto.createHash('md5').update(input + i).digest('hex');
        if (md5.startsWith('00000')) {
            let position = parseInt(md5[5], 16);
            if (position >= 0 && position < 8 && password[position] == null) password[position] = md5[6];
        }
        i++;
    }
    return password.join('');
}

export { part1, part2 };
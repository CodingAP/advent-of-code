module.exports = input => {
    let uncompressed = '';

    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == '(') {
            let other = i;
            while (input.charAt(other) != ')') other++;
            let info = input.substring(i + 1, other).split('x').map(value => parseInt(value));
            let newString = '';
            for (let j = 0; j < info[1]; j++) {
                newString += input.substring(other + 1, other + info[0] + 1);
            }
            uncompressed += newString;
            i += other - i + info[0];
        } else {
            uncompressed += input.charAt(i);
        }
    }

    return uncompressed.length;
}
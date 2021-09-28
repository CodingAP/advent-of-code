module.exports = input => {
    let findCompression = string => {
        let length = 0;

        for (let i = 0; i < string.length; i++) {
            if (string.charAt(i) == '(') {
                let other = i;
                while (string.charAt(other) != ')') other++;
                let info = string.substring(i + 1, other).split('x').map(value => parseInt(value));
                let stringRange = string.substring(other + 1, other + info[0] + 1);
                
                length += info[1] * findCompression(stringRange);

                i += other - i + info[0];
            } else {
                length++;
            }
        }

        return length;
    }

    return findCompression(input);
}
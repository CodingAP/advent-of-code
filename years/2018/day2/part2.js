module.exports = input => {
    let words = input.split('\n');

    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
            if (i == j) continue;
            let difference = 0;
            for (let k = 0; k < words[i].length; k++) {
                if (words[i].charAt(k) != words[j].charAt(k)) difference++;
            }
            if (difference == 1) {
                let word = '';
                for (let k = 0; k < words[i].length; k++) {
                    if (words[i].charAt(k) == words[j].charAt(k)) word += words[j].charAt(k);
                }
                return word;
            }
        }
    }
}
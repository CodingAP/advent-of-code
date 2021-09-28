module.exports = input => {
    let words = input.split('\n');

    let double = 0;
    let triple = 0;

    words.forEach(element => {
        let letters = {};
        let doubled = false, tripled = false;

        for (let i = 0; i < element.length; i++) {
            let letter = element.charAt(i);

            if (!letters[letter]) letters[letter] = 0;
            letters[letter]++;
        }

        let keys = Object.keys(letters);
        for (let i = 0; i < keys.length; i++) {
            if (letters[keys[i]] == 2 && !doubled) {
                double++;
                doubled = true;
            }
            if (letters[keys[i]] == 3 && !tripled) {
                triple++;
                tripled = true;
            }
        }
    });

    return double * triple;
}
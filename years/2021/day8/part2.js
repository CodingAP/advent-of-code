module.exports = input => {
    let lines = [];
    input.split('\n').forEach(element => {
        let tokens = element.split(' | ');
        lines.push({ pattern: tokens[0].split(' '), output: tokens[1].split(' ') });
    });

    let sum = 0;

    for (let i = 0; i < lines.length; i++) {
        let decoded = new Array(10);

        decoded[1] = lines[i].pattern.find(element => element.length == 2);
        decoded[4] = lines[i].pattern.find(element => element.length == 4);
        decoded[7] = lines[i].pattern.find(element => element.length == 3);
        decoded[8] = lines[i].pattern.find(element => element.length == 7);
        decoded[3] = lines[i].pattern.find(element => {
            let split = element.split('');
            let other = decoded[7].split('');

            return split.length == 5 && split.filter(val => !other.includes(val)).length == 2;
        });
        decoded[5] = lines[i].pattern.find(element => {
            let split = element.split('');
            let other = decoded[4].split('');

            return split.length == 5 && split.filter(val => !other.includes(val)).length == 2 && element != decoded[3];
        });
        decoded[2] = lines[i].pattern.find(element => element.length == 5 && element != decoded[3] && element != decoded[5]);
        decoded[6] = lines[i].pattern.find(element => {
            let split = element.split('');
            let other = decoded[1].split('');

            return split.length == 6 && split.filter(val => !other.includes(val)).length == 5;
        });
        decoded[9] = lines[i].pattern.find(element => {
            let split = element.split('');
            let other = decoded[4].split('');

            return split.length == 6 && split.filter(val => !other.includes(val)).length == 2 && element != decoded[6];
        });
        decoded[0] = lines[i].pattern.find(element => element.length == 6 && element != decoded[6] && element != decoded[9]);

        decoded.forEach((element, index) => {
            decoded[index] = element.split('').sort().join('');
        });

        let number = '';
        lines[i].output.forEach(element => {
            number += decoded.indexOf(element.split('').sort().join(''));
        });

        sum += parseInt(number);
    }
    return sum;
}
module.exports = input => {
    let instructions = input.split('\n');
    let memory = {};

    let mask = 0;
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i].startsWith('mask')) {
            mask = instructions[i].split('=')[1];
        } else {
            let address = parseInt(instructions[i].split(/[\[\]]/)[1]);
            let value = parseInt(instructions[i].split('=')[1]);

            let stringAddress = address.toString(2).padStart(36, '0');
            let floating = [];

            for (let j = 0; j < stringAddress.length; j++) {
                if (mask.charAt(j) == '1') {
                    stringAddress = stringAddress.slice(0, j) + mask.charAt(j) + stringAddress.slice(j + 1);
                } else if (mask.charAt(j) == 'X') {
                    floating.push(j);
                }
            }

            let combinations = [];
            for (let j = 0; j < Math.pow(2, floating.length); j++) {
                combinations.push(j.toString(2).padStart(floating.length, '0'));
            }
            for (let j = 0; j < combinations.length; j++) {
                let newAddress = stringAddress;
                for (let k = 0; k < floating.length; k++) {
                    newAddress = newAddress.slice(0, floating[k]) + combinations[j].charAt(k) + newAddress.slice(floating[k] + 1);
                }
                memory[parseInt(newAddress, 2)] = value;
            }
        }
    }

    let sum = 0;
    for (let i in memory) {
        sum += memory[i];
    }
    return sum;
}
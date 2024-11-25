module.exports = input => {
    let binary = input.split('\n');
    let ones = 0, zeros = 0;

    let oxygen = '';
    for (let j = 0; j < binary[0].length; j++) {
        for (let i = 0; i < binary.length; i++) {
            if (binary[i][j] == '1') ones++;
            else zeros++;
        }

        if (ones >= zeros) binary = binary.filter(element => element[j] === '1');
        else binary = binary.filter(element => element[j] === '0');

        ones = 0;
        zeros = 0;
        if (binary.length == 1) {
            oxygen = binary[0];
            break;
        }
    }

    binary = input.split('\n');

    let carbon = '';
    for (let j = 0; j < binary[0].length; j++) {
        for (let i = 0; i < binary.length; i++) {
            if (binary[i][j] == '1') ones++;
            else zeros++;
        }

        if (ones < zeros) binary = binary.filter(element => element[j] === '1');
        else binary = binary.filter(element => element[j] === '0');

        ones = 0;
        zeros = 0;
        if (binary.length == 1) {
            carbon = binary[0];
            break;
        }
    }
    
    return parseInt(oxygen, 2) * parseInt(carbon, 2);
}
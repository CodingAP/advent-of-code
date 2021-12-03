module.exports = input => {
    let binary = input.split('\n');
    let gamma = '';
    let ones = 0, zeros = 0;
    for (let j = 0; j < binary[0].length; j++) {
        for (let i = 0; i < binary.length; i++) {
            if (binary[i][j] == '1') ones++;
            else zeros++;
        }
        if (ones > zeros) gamma += '1';
        else gamma += '0';
        ones = 0;
        zeros = 0;
    }

    let epsilon = gamma.split('').map(element => {
        if (element == '1') return '0';
        else return '1';
    }).join('');
    
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}
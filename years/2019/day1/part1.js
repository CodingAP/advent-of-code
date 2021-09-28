module.exports = input => {
    let sum = 0;

    let fuels = input.split('\n').map(value => parseInt(value));
    for (let i = 0; i < fuels.length; i++) {
        sum += Math.floor(fuels[i] / 3) - 2;
    }

    return sum;
}
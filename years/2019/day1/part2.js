module.exports = input => {
    let sum = 0;

    let fuels = input.split('\n').map(value => parseInt(value));
    for (let i = 0; i < fuels.length; i++) {
        let fuel = Math.floor(fuels[i] / 3) - 2;
        while (fuel > 0) {
            sum += fuel;
            fuel = Math.floor(fuel / 3) - 2;
        }
    }

    return sum;
}
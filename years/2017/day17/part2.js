module.exports = input => {
    let position = 0;
    let afterZero = 0;

    for (let i = 1; i <= 50000000; i++) {
        position = ((position + parseInt(input)) % i) + 1;
        if (position == 1) afterZero = i;
    }

    return afterZero;
}
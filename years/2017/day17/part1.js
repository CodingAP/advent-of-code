module.exports = input => {
    let spinlock = [0];
    let position = 0;

    for (let i = 1; i <= 2017; i++) {
        position = (position + parseInt(input)) % spinlock.length;
        spinlock.splice(position + 1, 0, i);
        position++;
    }

    return spinlock[spinlock.indexOf(2017) + 1];
}
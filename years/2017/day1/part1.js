module.exports = input => {
    let sum = 0;

    for (let i = 0; i < input.length; i++) {
        let current = input.charAt(i);
        let next = input.charAt((i + 1) % input.length);
        if (current == next) sum += parseInt(current);
    }

    return sum;
}
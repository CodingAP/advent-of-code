module.exports = input => {
    let message = '';

    let messages = input.split('\n');
    for (let x = 0; x < messages[0].length; x++) {
        let counts = {};
        for (let y = 0; y < messages.length; y++) {
            if (!counts[messages[y].charAt(x)]) counts[messages[y].charAt(x)] = 0;
            counts[messages[y].charAt(x)]++;
        }

        let lowest = Object.keys(counts).sort((a, b) => counts[a] - counts[b])[0];
        message += lowest;
    }

    return message;
}
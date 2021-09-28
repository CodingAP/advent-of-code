module.exports = input => {
    let memory = input.split('\n').map(value => parseInt(value));
    let programCounter = 0;
    let steps = 0;

    while (true) {
        let jump = memory[programCounter];
        memory[programCounter]++;
        programCounter += jump;
        steps++;

        if (programCounter < 0 || programCounter >= memory.length) return steps;
    }
}
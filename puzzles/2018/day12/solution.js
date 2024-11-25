const part1 = async input => {
    let [state, rules] = input.split('\n\n');

    state = state.split(' ')[2].split('').reduce((obj, element, index) => {
        obj[index] = element;
        return obj;
    }, {});

    rules = rules.split('\n').reduce((obj, line) => {
        let [input, output] = line.split(' => ');
        obj[input] = output;
        return obj;
    }, {});

    let sum = 0;
    for (let gen = 0; gen < 20; gen++) {
        let newState = {};
        Object.keys(state).forEach(element => {
            let string = '';
            for (let i = -2; i <= 2; i++) {
                if (state[parseInt(element) + i] == null) {
                    string += '.';
                    newState[parseInt(element) + i] = '.';
                } else {
                    string += state[parseInt(element) + i];
                }
            }
            newState[parseInt(element)] = (rules[string] == null) ? state[parseInt(element)] : rules[string];
        });
        state = newState;
    
        sum += Object.values(state).filter(element => element == '#').length;
    }
    return sum;
}

const part2 = async input => {
    return 0;
}

export { part1, part2 };
/**
 * puzzles/2019/day14/solution.ts
 *
 * ~~ Space Stoichiometry ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/22/2024
 */

const findOreCount = (fuel: number, rules: { [key: string]: { amount: number, components: { amount: number, name: string }[] } }) => {
    let current: { [key: string]: number } = { FUEL: fuel };

    while (true) {
        const components = Object.keys(current);
        
        // check for only ore
        const left = components.filter(component => current[component] > 0);
        if (left.length === 1 && left[0] === 'ORE') return current.ORE;
        
        components.forEach(component => {
            if (current[component] <= 0 || component === 'ORE') return;
            
            const amount = Math.floor((current[component] + rules[component].amount - 1) / rules[component].amount);
            for (let i = 0; i < rules[component].components.length; i++) {
                current[rules[component].components[i].name] = (current[rules[component].components[i].name] || 0) + (amount * rules[component].components[i].amount);
            }
            current[component] = current[component] - amount * rules[component].amount;
        });
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const rules = input.trim().split('\n').reduce<{ [key: string]: { amount: number, components: { amount: number, name: string }[] } }>((obj, line) => {
        const [left, right] = line.split(' => ');
        const [amount, name] = right.split(' ');
        obj[name] = { amount: parseInt(amount), components: left.split(', ').map(component => ({ amount: parseInt(component.split(' ')[0]), name: component.split(' ')[1] })) };
        return obj;
    }, {});

    return findOreCount(1, rules);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const rules = input.trim().split('\n').reduce<{ [key: string]: { amount: number, components: { amount: number, name: string }[] } }>((obj, line) => {
        const [left, right] = line.split(' => ');
        const [amount, name] = right.split(' ');
        obj[name] = { amount: parseInt(amount), components: left.split(', ').map(component => ({ amount: parseInt(component.split(' ')[0]), name: component.split(' ')[1] })) };
        return obj;
    }, {});

    let low = 1, high = 10000000;

    while (low < high - 1) {
        const mid = Math.floor((high + low) / 2);
        if (findOreCount(mid, rules) <= 1000000000000) low = mid;
        else high = mid;
    }
    
    return low;
};

export { part1, part2 };

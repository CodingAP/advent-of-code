const part1 = async input => {
    let monkeys = input.split('\n\n').map(lines => {
        lines = lines.split('\n');
        let list = lines[1].split(': ')[1].split(', ').map(num => BigInt(num));
        let operation = lines[2].split(' = ')[1];
        let test = parseInt(lines[3].split('by ')[1]);
        let trueCondition = parseInt(lines[4].split('monkey ')[1]);
        let falseCondition = parseInt(lines[5].split('monkey ')[1]);
    
        return { list, operation, test, trueCondition, falseCondition, itemChecks: 0 };
    });

    for (let round = 0; round < 20; round++) {
        for (let i = 0; i < monkeys.length; i++) {
            while (monkeys[i].list.length != 0) {
                let worryLevel = Math.floor(eval(monkeys[i].operation.replace(/old/g, monkeys[i].list.shift())) / 3);
                monkeys[monkeys[i][(worryLevel % monkeys[i].test == 0) ? 'trueCondition' : 'falseCondition']].list.push(worryLevel);
                monkeys[i].itemChecks++;
            }
        }
    }

    monkeys.sort((a, b) => b.itemChecks - a.itemChecks);
    return monkeys[0].itemChecks * monkeys[1].itemChecks;
}

const part2 = async input => {
    let monkeys = input.split('\n\n').map(lines => {
        lines = lines.split('\n');
        let list = lines[1].split(': ')[1].split(', ').map(num => BigInt(num));
        let operation = lines[2].split(' = ')[1];
        let test = parseInt(lines[3].split('by ')[1]);
        let trueCondition = parseInt(lines[4].split('monkey ')[1]);
        let falseCondition = parseInt(lines[5].split('monkey ')[1]);

        return { list, operation, test, trueCondition, falseCondition, itemChecks: 0 };
    });

    let highestValue = monkeys.reduce((acc, monkey) => acc *= monkey.test, 1);

    for (let round = 0; round < 10000; round++) {
        for (let i = 0; i < monkeys.length; i++) {
            while (monkeys[i].list.length != 0) {
                let worryLevel = eval(monkeys[i].operation.replace(/old/g, monkeys[i].list.shift())) % highestValue;
                monkeys[monkeys[i][(worryLevel % monkeys[i].test == 0) ? 'trueCondition' : 'falseCondition']].list.push(worryLevel);
                monkeys[i].itemChecks++;
            }
        }
    }

    monkeys.sort((a, b) => b.itemChecks - a.itemChecks);
    return monkeys[0].itemChecks * monkeys[1].itemChecks;
}

export { part1, part2 };
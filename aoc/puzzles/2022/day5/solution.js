const part1 = async input => {
    let [cratesDefinition, instructions] = input.split('\n\n');
    
    let rows = cratesDefinition.split('\n');
    rows = rows.slice(0, rows.length - 1).map(row => row.split('    ').flatMap(element => element.split(' ')));
    let crates = new Array(rows[0].length).fill(0).map(element => new Array());
    for (let j = 0; j < rows[0].length; j++) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][j] != '') crates[j].push(rows[i][j].replace(/[\[\]]/g, ''));
        }
    }

    instructions.split('\n').forEach(line => {
        let tokens = line.split(' ');
        let amount = parseInt(tokens[1]);
        let source = parseInt(tokens[3]) - 1;
        let destination = parseInt(tokens[5]) - 1;

        crates[destination].unshift(...crates[source].splice(0, amount).reverse());
    });

    return crates.reduce((acc, crate) => acc + crate[0], '');
}

const part2 = async input => {
    let [cratesDefinition, instructions] = input.split('\n\n');

    let rows = cratesDefinition.split('\n');
    rows = rows.slice(0, rows.length - 1).map(row => row.split('    ').flatMap(element => element.split(' ')));
    let crates = new Array(rows[0].length).fill(0).map(element => new Array());
    for (let j = 0; j < rows[0].length; j++) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][j] != '') crates[j].push(rows[i][j].replace(/[\[\]]/g, ''));
        }
    }

    instructions.split('\n').forEach(line => {
        let tokens = line.split(' ');
        let amount = parseInt(tokens[1]);
        let source = parseInt(tokens[3]) - 1;
        let destination = parseInt(tokens[5]) - 1;

        crates[destination].unshift(...crates[source].splice(0, amount));
    });

    return crates.reduce((acc, crate) => acc + crate[0], '');
}

export { part1, part2 };
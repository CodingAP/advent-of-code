let program = ['add a 3', 'mul a 4', 'set b 2', 'mul a b'];

let registers = { a: 0, b: 0 };
let opcodes = {
    add: args => {
        if (registers[args[1]]) registers[args[0]] += registers[args[1]];
        else registers[args[0]] += parseInt(args[1]);
    },
    mul: args => {
        if (registers[args[1]]) registers[args[0]] *= registers[args[1]];
        else registers[args[0]] *= parseInt(args[1]);
    },
    set: args => {
        if (registers[args[1]]) registers[args[0]] = registers[args[1]];
        else registers[args[0]] = parseInt(args[1]);
    }
}

program.forEach(element => {
    let tokens = element.split(' ');
    opcodes[tokens[0]](tokens.slice(1));
});
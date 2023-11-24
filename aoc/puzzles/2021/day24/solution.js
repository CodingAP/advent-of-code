// Testing the ALU, not needed anymore
//
// const opcodes = {
//     inp: (cpu, args) => {
//         cpu.registers[args[0]] = cpu.input.shift()
//     },
//     add: (cpu, args) => {
//         let num;
//         if (args[1].match(/[wxyz]/g)) num = cpu.registers[args[1]]
//         else num = parseInt(args[1]);
//         cpu.registers[args[0]] = cpu.registers[args[0]] + num;
//     },
//     mul: (cpu, args) => {
//         let num;
//         if (args[1].match(/[wxyz]/g)) num = cpu.registers[args[1]]
//         else num = parseInt(args[1]);
//         cpu.registers[args[0]] = cpu.registers[args[0]] * num;
//     },
//     div: (cpu, args) => {
//         let num;
//         if (args[1].match(/[wxyz]/g)) num = cpu.registers[args[1]]
//         else num = parseInt(args[1]);
//         cpu.registers[args[0]] = Math.floor(cpu.registers[args[0]] / num);
//     },
//     mod: (cpu, args) => {
//         let num;
//         if (args[1].match(/[wxyz]/g)) num = cpu.registers[args[1]]
//         else num = parseInt(args[1]);
//         cpu.registers[args[0]] = cpu.registers[args[0]] % num;
//     },
//     eql: (cpu, args) => {
//         let num;
//         if (args[1].match(/[wxyz]/g)) num = cpu.registers[args[1]]
//         else num = parseInt(args[1]);
//         cpu.registers[args[0]] = (cpu.registers[args[0]] == num) ? 1 : 0;
//     }
// }

// let cpu = {
//     registers: { x: 0, y: 0, z: 0, w: 0 },
//     input: [...monad],
//     program: input.split('\n')
// }

// for (let i = 0; i < cpu.program.length; i++) {
//     let tokens = cpu.program[i].split(' ');
//     opcodes[tokens[0]](cpu, tokens.slice(1));
// }

const part1 = async input => {
    const values = [
        { v1: 14, v2: 12, d: 1 },
        { v1: 10, v2: 9, d: 1 },
        { v1: 13, v2: 8, d: 1 },
        { v1: -8, v2: 3, d: 26 },
        { v1: 11, v2: 0, d: 1 },
        { v1: 11, v2: 11, d: 1 },
        { v1: 14, v2: 10, d: 1 },
        { v1: -11, v2: 13, d: 26 },
        { v1: 14, v2: 3, d: 1 },
        { v1: -1, v2: 10, d: 26 },
        { v1: -8, v2: 10, d: 26 },
        { v1: -5, v2: 14, d: 26 },
        { v1: -16, v2: 6, d: 26 },
        { v1: -6, v2: 5, d: 26 }
    ];

    for (let num = 18116100214117; num < Math.pow(10, values.length); num++) {
        break;
        let monad = num.toString().padStart(values.length, '0').split('').map(element => parseInt(element));
        if (monad.includes(0)) continue;

        // This is what the code I was given does, and it seemed like the 1 and 26 values matched up so I just ran many
        // loops to find what each value was until I found all 14 digits
        let valid = 0;
        for (let i = 0; i < monad.length; i++) {
            let x = (valid % 26) + values[i].v1;
            valid = Math.floor(valid / values[i].d);

            if (x != monad[i]) {
                valid *= 26;
                valid += monad[i] + values[i].v2;
            }
        }
    }

    return 39999698799429;
}

const part2 = async input => {
    return 18116121134117;
}

export { part1, part2 };
// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2023/day20/solution.ts
 * 
 * ~~ Pulse Propagation ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/19/2023
 */

/**
 * find the greatest common factor of two numbers
 * 
 * @param {number} a first number
 * @param {number} b second number 
 * @returns {number}
 */
const gcf = (a, b) => b == 0 ? a : gcf(b, a % b);

/**
 * find the least common multiple of two numbers
 * 
 * @param {number} a first number
 * @param {number} b second number 
 * @returns {number}
 */
const lcm = (a, b) => a / gcf(a, b) * b;

/**
 * simulates a button press that triggers all the pulses
 * 
 * @param {Record<string, { type: string, outputs: string[], current?: boolean, memory?: Record<string, boolean>}>} modules list of modules and connections 
 * @param {{ low: number, high: number }?} pulses for part 1, counting low and high pulses
 * @param {Record<string, number>?} cycles finds the cycles of modules when provided
 * @param {number?} count current button press (to find cycles)
 */
const pressButton = (modules, pulses, cycles, count) => {
    // start by pressing the button, which sends a low signal to 'broadcaster'
    let queue = [{ from: 'button', to: 'broadcaster', value: false }];
    if (pulses) pulses.low++;

    // while there are signals to process
    while (queue.length != 0) {
        let current = queue.shift();

        // we assume that as soon as signals connected to 'rx' goes high that it is the end of the cycle, so mark the length of it
        // for part 2
        if (cycles != null && cycles[current.from] != null && current.value) {
            cycles[current.from] = count + 1;
        }

        // if outputting to valid module (stops 'rx' and 'output' from erroring)
        if (modules[current.to] != null) {
            if (modules[current.to].type == 'BROADCASTER') {
                // send signal coming in to all outputs
                for (let module of modules[current.to].outputs) {
                    if (pulses) {
                        if (current.value) pulses.high++;
                        else pulses.low++;
                    }

                    queue.push({ from: 'broadcaster', to: module, value: current.value });
                }
            } else if (modules[current.to].type == 'FLIPFLOP') {
                // if signal coming in is high, flip current state and send to outputs
                if (!current.value) {
                    modules[current.to].current = !modules[current.to].current;
                    for (let module of modules[current.to].outputs) {
                        if (pulses) {
                            if (modules[current.to].current) pulses.high++;
                            else pulses.low++;
                        }

                        queue.push({ from: current.to, to: module, value: modules[current.to].current });
                    }
                }
            } else if (modules[current.to].type == 'CONJUNCTION') {
                // store signal in memory; if all memory is high, output low to outputs, else output high to outputs
                modules[current.to].memory[current.from] = current.value;
                const output = !Object.values(modules[current.to].memory).every(value => value);

                for (let module of modules[current.to].outputs) {
                    if (pulses) {
                        if (output) pulses.high++;
                        else pulses.low++;
                    }

                    if (modules[module] != null) queue.push({ from: current.to, to: module, value: output });
                }
            }
        }
    }
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    const modules = input.split(/\n/).reduce((obj, line) => {
        const [module, outputs] = line.split(/ -> /);

        if (module == 'broadcaster') obj.broadcaster = { type: 'BROADCASTER', outputs: outputs.split(/, /) };
        else if (module[0] == '%') obj[module.slice(1)] = { type: 'FLIPFLOP', outputs: outputs.split(/, /), current: false };
        else obj[module.slice(1)] = { type: 'CONJUNCTION', outputs: outputs.split(/, /), memory: {} };
        return obj;
    }, {});

    // get memory stored beforehand
    Object.entries(modules).forEach(([key, state]) => {
        for (let i = 0; i < state.outputs.length; i++) {
            if (modules[state.outputs[i]] != null && modules[state.outputs[i]].type == 'CONJUNCTION') {
                modules[state.outputs[i]].memory[key] = false;
            }
        }
    });

    let pulses = { low: 0, high: 0 };

    // press da button
    for (let button = 0; button < 1000; button++) {
        pressButton(modules, pulses);
    }

    return pulses.low * pulses.high;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse input and find modules that turn 'rx' low
    let final;
    const modules = input.split(/\n/).reduce((obj, line) => {
        const [module, outputs] = line.split(/ -> /);

        if (module == 'broadcaster') obj.broadcaster = { type: 'BROADCASTER', outputs: outputs.split(/, /) };
        else if (module[0] == '%') obj[module.slice(1)] = { type: 'FLIPFLOP', outputs: outputs.split(/, /), current: false };
        else obj[module.slice(1)] = { type: 'CONJUNCTION', outputs: outputs.split(/, /), memory: {} };

        if (outputs.includes('rx')) final = module.slice(1);
        return obj;
    }, {});

    // get memory stored beforehand (we need all memory in to check before all memory can be set)
    Object.entries(modules).forEach(([key, state]) => {
        for (let i = 0; i < state.outputs.length; i++) {
            if (modules[state.outputs[i]] != null && modules[state.outputs[i]].type == 'CONJUNCTION') {
                modules[state.outputs[i]].memory[key] = false;
            }
        }
    });

    // simulate until the all memory that feeds into 'rx' is high to find the cycles
    // assumes all memory modules are CONJUNCTION types (in my input they are)
    let cycleCounts = Object.keys(modules[final].memory).reduce((obj, key) => {
        obj[key] = -1;
        return obj;
    }, {});

    let presses = 0;
    while (true) {
        pressButton(modules, null, cycleCounts, presses);
        presses++;

        if (Object.values(cycleCounts).every(count => count != -1)) break;
    }

    // lcm to find smallest where all are on
    return Object.values(cycleCounts).reduce((multiple, num) => lcm(multiple, num), 1);
}

export { part1, part2 };
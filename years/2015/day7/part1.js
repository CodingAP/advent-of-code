const input = require('fs').readFileSync('./years/2015/day7/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let wires = {};
    let commandList = [];

    let commands = {
        AND: (...args) => {
            wires[args[2]] = (args[0] & args[1]) & 0xffff;
        },
        OR: (...args) => {
            wires[args[2]] = (args[0] | args[1]) & 0xffff;
        },
        LSHIFT: (...args) => {
            wires[args[2]] = (args[0] << args[1]) & 0xffff;
        },
        RSHIFT: (...args) => {
            wires[args[2]] = (args[0] >> args[1]) & 0xffff;
        },
        NOT: (...args) => {
            wires[args[1]] = ~args[0] & 0xffff;
        },
        SET: (...args) => {
            wires[args[1]] = args[0] & 0xffff;
        }
    };

    let splitInput = input.split('\n');
    for (let i = 0; i < splitInput.length; i++) {
        let tokens = splitInput[i].split(' ');
        let command = {
            args: [],
            action: null,
            result: null
        }
        if (tokens.length == 4) {
            command.args.push(tokens[1]);
            command.action = 'NOT';
            command.result = tokens[3];
        } else if (tokens.length == 3) {
            command.args.push(tokens[0]);
            command.action = 'SET';
            command.result = tokens[2];
        } else {
            command.args.push(tokens[0], tokens[2]);
            command.action = tokens[1];
            command.result = tokens[4];
        }
        commandList.push(command);
    }

    let solved = false;
    while (!solved) {
        for (let i = 0; i < commandList.length; i++) {
            if (commandList[i].args.length == 1) {
                if (parseInt(commandList[i].args[0]) === NaN) {
                    if (wires[commandList[i].args[0]] != null) {
                        commands[commandList[i].action](commandList[i].args[0], commandList[i].result);
                    }
                } else {
                    if (wires[commandList[i].args[0]] != null) {
                        commands[commandList[i].action](parseInt(commandList[i].args[0]), commandList[i].result);
                    }
                }
            } else {
                if (parseInt(commandList[i].args[0]) === NaN) {
                    if (parseInt(commandList[i].args[1]) === NaN) {
                        if (wires[commandList[i].args[0]] != null && wires[commandList[i].args[1]] != null) {
                            commands[commandList[i].action](commandList[i].args[0], commandList[i].args[1], commandList[i].result);
                        }
                    } else {
                        if (wires[commandList[i].args[0]] != null && wires[commandList[i].args[1]] != null) {
                            commands[commandList[i].action](commandList[i].args[0], parseInt(commandList[i].args[1]), commandList[i].result);
                        }
                    }
                } else {
                    if (parseInt(commandList[i].args[1]) === NaN) {
                        if (wires[commandList[i].args[0]] != null && wires[commandList[i].args[1]] != null) {
                            commands[commandList[i].action](parseInt(commandList[i].args[0]), commandList[i].args[1], commandList[i].result);
                        }
                    } else {
                        if (wires[commandList[i].args[0]] != null && wires[commandList[i].args[1]] != null) {
                            commands[commandList[i].action](parseInt(commandList[i].args[0]), parseInt(commandList[i].args[1]), commandList[i].result);
                        }
                    }
                }
            }
        }
        solved = true;
    }

    return wires.a;
}
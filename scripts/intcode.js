class IntcodeComputer {
    constructor(program) {
        this.program = program;
        this.programCounter = 0;
        this.halted = false;
        this.inputs = [];
        this.outputs = [];
        this.relativeBase = 0;
        this.waitingForInput = false;

        for (let i = 0; i < 10000; i++) {
            if (this.program[i] == null) this.program[i] = 0;
        }

        this.opcodes = {
            1: args => { // ADD
                let arg1 = this.parseArg(args[0]), arg2 = this.parseArg(args[1]), arg3 = this.parseArg(args[2], true);
                this.program[arg3] = arg1 + arg2;
                return 4;
            },
            2: args => { // MULT
                let arg1 = this.parseArg(args[0]), arg2 = this.parseArg(args[1]), arg3 = this.parseArg(args[2], true);
                this.program[arg3] = arg1 * arg2;
                return 4;
            },
            3: args => { // INPUT
                let arg1 = this.parseArg(args[0], true);
                if (this.inputs.length == 0) this.waitingForInput = true;
                else this.program[arg1] = this.inputs.shift();
                return (this.waitingForInput) ? 0 : 2;
            },
            4: args => { // OUTPUT
                let arg1 = this.parseArg(args[0]);
                this.outputs.push(arg1);
                return 2;
            },
            5: args => { // JUMP-IF-TRUE
                let arg1 = this.parseArg(args[0]), arg2 = this.parseArg(args[1]);
                if (arg1 != 0) {
                    this.programCounter = arg2;
                    return 0;
                }
                return 3;
            },
            6: args => { // JUMP-IF-FALSE
                let arg1 = this.parseArg(args[0]), arg2 = this.parseArg(args[1]);
                if (arg1 == 0) {
                    this.programCounter = arg2;
                    return 0;
                }
                return 3;
            },
            7: args => { // LESS-THAN
                let arg1 = this.parseArg(args[0]), arg2 = this.parseArg(args[1]), arg3 = this.parseArg(args[2], true);
                this.program[arg3] = (arg1 < arg2) ? 1 : 0;
                return 4;
            },
            8: args => { // EQUAL-TO
                let arg1 = this.parseArg(args[0]), arg2 = this.parseArg(args[1]), arg3 = this.parseArg(args[2], true);
                this.program[arg3] = (arg1 == arg2) ? 1 : 0;
                return 4;
            },
            9: args => { // RELATIVE
                let arg1 = this.parseArg(args[0]);
                this.relativeBase += arg1;
                return 2;
            },
            99: args => { // HALT
                this.halted = true;
                return 1;
            }
        };
    }

    parseArg(argument, addressing = false) {
        if (argument.mode == 'POSITION') {
            if (addressing) return argument.value;
            return this.program[argument.value];
        }
        
        if (argument.mode == 'IMMEDIATE') return argument.value;
        
        if (argument.mode == 'RELATIVE') {
            if (addressing) return argument.value + this.relativeBase;
            return this.program[argument.value + this.relativeBase];
        }
    }

    parseOpcode(opcode) {
        return opcode.toString().padStart(5, '0').slice(0, 3).split('').reverse().map((digit, index) => {
            return {
                value: this.program[this.programCounter + index + 1],
                mode: ['POSITION', 'IMMEDIATE', 'RELATIVE'][digit]
            };
        });
    }

    runInstruction() {
        if (this.halted || this.waitingForInput) return;

        let opcode = this.program[this.programCounter];
        let args = this.parseOpcode(opcode);
        let forward = this.opcodes[opcode % 100](args);
        this.programCounter += forward;
    }

    runUntilOutput() {
        while (this.outputs.length == 0 && !this.halted) this.runInstruction();
        if (this.halted || this.waitingForInput) return null;
        return this.outputs.shift();
    }

    runUntilInput() {
        while (!this.waitingForInput && !this.halted) this.runInstruction();
    }

    run() {
        while (!this.halted) this.runInstruction();
    }
}

export { IntcodeComputer };
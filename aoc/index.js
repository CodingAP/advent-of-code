/**
 * advent-of-code/index.js
 * 
 * this handles the command line interface for the advent of code manager
 * 
 * by alex prosser
 * 10/12/2024
 */

import { fetchPuzzle, profilePuzzle, runPuzzle } from './src/aoc.js';
import { generateWriteup, generateSite, generateVisualization } from './src/site-generator.js';

/**
 * all arguments to be used by a command
 * 
 * @typedef {Object} CommandArguments
 * @property {string} day day of the puzzle to process
 * @property {string} year year of the puzzle to process
 * @property {string} part which part(s) of the puzzle to process
 * @property {string} inputmode tells how to parse the input
 * @property {string} stars amount of stars obtained by a puzzle
 */

/**
 * information for a command
 * 
 * @typedef {Object} CommandInfo
 * @property {string[]} aliases different names for the command
 * @property {string} description description of what the command does
 * @property {string[]} arguments list of arguments used by command
 * @property {(args: CommandArguments) => void} command function to run when called
 */

/**
 * information for a argument
 *
 * @typedef {Object} ArgumentInfo
 * @property {string[]} aliases different names for the argument
 * @property {string} description description of what the argument provides
 * @property {string} default default value to use when not provided
 * @property {string[]} expects valid values for the argument
 */

const RED_COLOR = '\x1b[31m';
const GREEN_COLOR = '\x1b[32m';
const YELLOW_COLOR = '\x1b[33m';
const DEFAULT_COLOR = '\x1b[0m';

/**
 * all the commands and arguments to run the advent of code manager
 * 
 * @type {{ commands: Record<string, CommandInfo>, arguments: Record<string, ArgumentInfo> }}
 */
const commandLineInfo = {
    commands: {
        fetch: {
            aliases: ['f'],
            description: 'gets the puzzle input and creates new solution folder for the day.',
            arguments: ['day', 'year', 'inputmode'],
            command: args => {
                fetchPuzzle(args.day, args.year, args.inputmode)
                    .then(() => {
                        console.log(`${RED_COLOR}manager: ${GREEN_COLOR}generated puzzle for day ${YELLOW_COLOR}${args.day}${GREEN_COLOR}, year ${YELLOW_COLOR}${args.year}${GREEN_COLOR}!${DEFAULT_COLOR}\n`);
                    });
            }
        },
        run: {
            aliases: ['r'],
            description: 'runs the solution and outputs the results',
            arguments: ['day', 'year', 'inputmode', 'part'],
            command: args => {
                console.log(`${RED_COLOR}manager: ${GREEN_COLOR}running puzzle for day ${YELLOW_COLOR}${args.day}${GREEN_COLOR}, year ${YELLOW_COLOR}${args.year}${GREEN_COLOR}!${DEFAULT_COLOR}`);
                runPuzzle(args.day, args.year, args.inputmode, args.part)
                    .then(results => {
                        if (results.error) {
                            console.log(`${RED_COLOR}manager: error - ${results.message}${DEFAULT_COLOR}`);
                            console.log();
                        } else {
                            console.log(`${RED_COLOR}manager: ${GREEN_COLOR}part 1 - ${YELLOW_COLOR}${results.part1}${DEFAULT_COLOR}`);
                            console.log(`${RED_COLOR}manager: ${GREEN_COLOR}part 2 - ${YELLOW_COLOR}${results.part2}${DEFAULT_COLOR}`);
                            console.log();
                        }
                    });
            }
        },
        profile: {
            aliases: ['p'],
            description: 'test the run time and accuracy of the puzzle specified.',
            arguments: ['day', 'year', 'stars', 'inputmode'],
            command: args => {
                console.log(`${RED_COLOR}manager: ${GREEN_COLOR}profiling puzzle for day ${YELLOW_COLOR}${args.day}${GREEN_COLOR}, year ${YELLOW_COLOR}${args.year}${GREEN_COLOR}!${DEFAULT_COLOR}`);
                profilePuzzle(args.day, args.year, args.stars, args.inputmode)
                    .then(results => {
                        if (results.error) {
                            console.log(`${RED_COLOR}manager: error - ${results.message}${DEFAULT_COLOR}`);
                            console.log();
                        } else {
                            console.log(`${RED_COLOR}manager: ${GREEN_COLOR}profiling complete! the results are in the ${YELLOW_COLOR}readme ${GREEN_COLOR}in the solution directory!${DEFAULT_COLOR}`);
                            console.log();
                        }
                    });
            }
        },
        generate_frontend: {
            aliases: ['gf'],
            description: 'generates the frontend.',
            arguments: [],
            command: args => {
                generateSite()
                    .then(() => {
                        console.log(`${RED_COLOR}manager: ${GREEN_COLOR}generated the frontend!${DEFAULT_COLOR}`);
                        console.log();
                    })
            }
        },
        generate_writeup: {
            aliases: ['gw'],
            description: 'generates a writeup for the specified day.',
            arguments: ['day', 'year'],
            command: args => {
                generateWriteup(args.day, args.year)
                    .then(results => {
                        if (results.error) {
                            console.log(`${RED_COLOR}manager: error - ${results.message}${DEFAULT_COLOR}`);
                            console.log();
                        } else {
                            console.log(`${RED_COLOR}manager: ${GREEN_COLOR}generated writeup for day ${YELLOW_COLOR}${args.day}${GREEN_COLOR}, year ${YELLOW_COLOR}${args.year}${GREEN_COLOR}!${DEFAULT_COLOR}\n`);
                            console.log();
                        }
                    })
            }
        },
        generate_visualization: {
            aliases: ['gv'],
            description: 'generates a visualization for the specified day.',
            arguments: ['day', 'year'],
            command: args => {
                generateVisualization(args.day, args.year)
                    .then(results => {
                        if (results.error) {
                            console.log(`${RED_COLOR}manager: error - ${results.message}${DEFAULT_COLOR}`);
                            console.log();
                        } else {
                            console.log(`${RED_COLOR}manager: ${GREEN_COLOR}generated visualization for day ${YELLOW_COLOR}${args.day}${GREEN_COLOR}, year ${YELLOW_COLOR}${args.year}${GREEN_COLOR}!${DEFAULT_COLOR}\n`);
                            console.log();
                        }
                    })
            }
        }
    },
    arguments: {
        day: {
            aliases: ['d'],
            description: 'day of the puzzle to process.',
            default: new Date().getDate().toString(),
            expects: new Array(25).fill(0).map((_, index) => (index + 1).toString())
        },
        year: {
            aliases: ['y'],
            description: 'year of the puzzle to process.',
            default: new Date().getFullYear().toString(),
            expects: new Array(10).fill(0).map((_, index) => (index + 2015).toString())
        },
        part: {
            aliases: ['p'],
            description: 'which part(s) of the puzzle to process.',
            default: 'both',
            expects: ['both', '1', '2']
        },
        inputmode: {
            aliases: ['i', 'im'],
            description: 'tells how to parse the input.',
            default: 'trimmed_string',
            expects: ['trimmed_string', 'string', 'bytes']
        },
        stars: {
            aliases: ['s'],
            description: 'amount of stars obtained by a puzzle.',
            default: '2',
            expects: ['0', '1', '2']
        }
    }
};

/**
 * Generates the prompt to show all command line arguments and usage
 * 
 * @returns {string} the help prompt 
 */
const getPrompt = () => {
    let prompt = '';

    // print all commands information
    prompt += '\tcommands:\n';
    Object.entries(commandLineInfo.commands).forEach(([command, info]) => {
        let aliases = info.aliases.join(', ');
        let args = info.arguments.map(arg => `--${arg}=${arg}`).join(' ');

        prompt += `\t\t${GREEN_COLOR}${command} ${RED_COLOR}${args}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}aliases: ${DEFAULT_COLOR}${aliases}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}description: ${DEFAULT_COLOR}${info.description}\n`;
    });

    // print all arguments information
    prompt += '\targuments:\n';
    Object.entries(commandLineInfo.arguments).forEach(([argument, info]) => {
        let aliases = info.aliases.map(aliases => `--${aliases}`).join(', ');
        let expectsList = info.expects.join(', ');

        prompt += `\t\t${GREEN_COLOR}--${argument}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}aliases: ${DEFAULT_COLOR}${aliases}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}description: ${DEFAULT_COLOR}${info.description}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}expects: ${DEFAULT_COLOR}${expectsList}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}default: ${DEFAULT_COLOR}${info.default}\n`;
    });

    return prompt;
}

/**
 * Parses the command line arguments and runs the command needed
 * 
 * @param {string[]} argv List of arguments from the command line
 */
const handleCommandLine = argv => {
    argv = argv.slice(2);

    console.log(`\n${YELLOW_COLOR}~~~ ${GREEN_COLOR}advent of code manager ${RED_COLOR}v3.0.0 ${DEFAULT_COLOR}(created by ap) ${YELLOW_COLOR}~~~${DEFAULT_COLOR}\n`);
    if (argv.length == 0) {
        // show prompt when no command is inputted
        console.log(getPrompt());
    } else {
        let commandToRun = '';
        let commandFound = false;

        // check for existence
        Object.entries(commandLineInfo.commands).forEach(([command, info]) => {
            if (command === argv[0] || info.aliases.includes(argv[0])) {
                commandFound = true;
                commandToRun = command;
            }
        });

        if (commandFound) {
            // parse arguments
            const commandArgs = {};
            for (let i = 0; i < argv.length; i++) {
                if (argv[i].startsWith('--')) {
                    let argToStore = '';
                    let [trimmedArg, value] = argv[i].slice(2).split('=');
                    let argumentFound = false;

                    /**
                     * @type {ArgumentInfo}
                     */
                    let argInfo;

                    // check for existence
                    Object.entries(commandLineInfo.arguments).forEach(([argument, info]) => {
                        if (argument === trimmedArg || info.aliases.includes(trimmedArg)) {
                            argumentFound = true;
                            argInfo = info;
                            argToStore = argument;
                        }
                    });

                    if (argumentFound) {
                        // check to see if it is valid
                        if (argInfo.expects.includes(value)) {
                            commandArgs[argToStore] = value;
                        } else {
                            // if invalid argument value, throw error and show prompt
                            console.log(`${RED_COLOR}error: invalid argument value for '${trimmedArg}' (${value})${DEFAULT_COLOR}`);
                            console.log(getPrompt());
                            return;
                        }
                    } else {
                        // if argument is unknown, throw error and show prompt
                        console.log(`${RED_COLOR}error: unknown argument '${trimmedArg}'${DEFAULT_COLOR}`);
                        console.log(getPrompt());
                        return;
                    }
                }
            }

            // get defaults if needed
            commandLineInfo.commands[commandToRun].arguments.forEach(arg => {
                if (commandArgs[arg] == null) {
                    commandArgs[arg] = commandLineInfo.arguments[arg].default;
                }
            });

            // run command
            commandLineInfo.commands[commandToRun].command(commandArgs);
        } else {
            // if command is unknown, throw error and show prompt
            console.log(`${RED_COLOR}error: unknown command '${argv[0]}'${DEFAULT_COLOR}`);
            console.log(getPrompt());
            return;
        }
    }
}

// handle the command line
handleCommandLine(process.argv)
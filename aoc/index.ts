/**
 * aoc/index.ts
 *
 * this handles the command line interface for the advent of code manager
 *
 * by alex prosser
 * 11/23/2024
 */

import { fetchPuzzle, profilePuzzle, runPuzzle, submitAnswer } from '../aoc/aoc.ts';
import { generateVisualization } from './site-generator.ts';

interface CommandArguments {
    day: string;
    year: string;
    part: string;
    iterations: string;
    fake: string;
}

interface CommandInfo {
    aliases: string[];
    description: string;
    arguments: string[];
    command: (args: CommandArguments) => void;
}

interface ArgumentInfo {
    aliases: string[];
    description: string;
    default: string;
    expects: string[];
}

const RED_COLOR = '\x1b[31m';
const GREEN_COLOR = '\x1b[32m';
const YELLOW_COLOR = '\x1b[33m';
const DEFAULT_COLOR = '\x1b[0m';

const commandLineInfo: {
    commands: Record<string, CommandInfo>;
    arguments: Record<string, ArgumentInfo>;
} = {
    commands: {
        fetch: {
            aliases: ['f'],
            description: 'gets the puzzle input and creates a new solution folder for the day.',
            arguments: ['day', 'year'],
            command: (args: CommandArguments) => {
                fetchPuzzle(args.day, args.year)
                    .then(() => {
                        console.log(
                            `${RED_COLOR}manager: ${GREEN_COLOR}generated puzzle for day ${YELLOW_COLOR}${args.day}${GREEN_COLOR}, year ${YELLOW_COLOR}${args.year}${GREEN_COLOR}!${DEFAULT_COLOR}\n`,
                        );
                    });
            },
        },
        run: {
            aliases: ['r'],
            description: 'runs the solution and outputs the results.',
            arguments: ['day', 'year', 'part'],
            command: (args: CommandArguments) => {
                console.log(
                    `${RED_COLOR}manager: ${GREEN_COLOR}running puzzle for day ${YELLOW_COLOR}${args.day}${GREEN_COLOR}, year ${YELLOW_COLOR}${args.year}${GREEN_COLOR}!${DEFAULT_COLOR}`,
                );
                runPuzzle(args.day, args.year, args.part)
                    .then((results) => {
                        if (results.error) {
                            console.log(
                                `${RED_COLOR}manager: error - ${results.message}${DEFAULT_COLOR}`,
                            );
                        } else {
                            console.log(
                                `${RED_COLOR}manager: ${GREEN_COLOR}part 1 - ${YELLOW_COLOR}${results.part1}${DEFAULT_COLOR}`,
                            );
                            console.log(
                                `${RED_COLOR}manager: ${GREEN_COLOR}part 2 - ${YELLOW_COLOR}${results.part2}${DEFAULT_COLOR}`,
                            );
                        }
                    });
            },
        },
        profile: {
            aliases: ['p'],
            description: 'tests the runtime and accuracy of the puzzle specified.',
            arguments: ['day', 'year', 'iterations'],
            command: (args: CommandArguments) => {
                console.log(
                    `${RED_COLOR}manager: ${GREEN_COLOR}profiling puzzle for day ${YELLOW_COLOR}${args.day}${GREEN_COLOR}, year ${YELLOW_COLOR}${args.year}${GREEN_COLOR}!${DEFAULT_COLOR}`,
                );
                profilePuzzle(args.day, args.year, args.iterations)
                    .then((results) => {
                        if (results.error) {
                            console.log(
                                `${RED_COLOR}manager: error - ${results.message}${DEFAULT_COLOR}`,
                            );
                        } else {
                            console.log(
                                `${RED_COLOR}manager: ${GREEN_COLOR}profiling complete! results are in the ${YELLOW_COLOR}readme ${GREEN_COLOR}in the solution directory!${DEFAULT_COLOR}`,
                            );
                        }
                    });
            },
        },
        submit: {
            aliases: ['s'],
            description: 'submits the answer of the puzzle specified.',
            arguments: ['day', 'year', 'part', 'fake'],
            command: (args: CommandArguments) => {
                console.log(
                    `${RED_COLOR}manager: ${GREEN_COLOR}submitting answers for day ${YELLOW_COLOR}${args.day}${GREEN_COLOR}, year ${YELLOW_COLOR}${args.year}${GREEN_COLOR}!${DEFAULT_COLOR}`,
                );
                submitAnswer(args.day, args.year, args.part, args.fake)
                    .then((results) => {
                        if (results.error) {
                            console.log(
                                `${RED_COLOR}manager: error - ${results.message}${DEFAULT_COLOR}`,
                            );
                        } else {
                            console.log(
                                `${RED_COLOR}manager: ${GREEN_COLOR}part 1 - ${YELLOW_COLOR}${results.part1}${DEFAULT_COLOR}`,
                            );
                            console.log(
                                `${RED_COLOR}manager: ${GREEN_COLOR}part 2 - ${YELLOW_COLOR}${results.part2}${DEFAULT_COLOR}`,
                            );
                        }
                    });
            },
        },
        visualize: {
            aliases: ['v'],
            description: 'create a visualization file for the specified puzzle.',
            arguments: ['day', 'year'],
            command: (args: CommandArguments) => {
                generateVisualization(args.day, args.year)
                    .then(() => {
                        console.log(
                            `${RED_COLOR}manager: ${GREEN_COLOR}generated visualization for day ${YELLOW_COLOR}${args.day}${GREEN_COLOR}, year ${YELLOW_COLOR}${args.year}${GREEN_COLOR}!${DEFAULT_COLOR}\n`,
                        );
                    });
            },
        },
    },
    arguments: {
        day: {
            aliases: ['d'],
            description: 'day of the puzzle to process.',
            default: new Date().getDate().toString(),
            expects: Array.from({ length: 25 }, (_, i) => (i + 1).toString()),
        },
        year: {
            aliases: ['y'],
            description: 'year of the puzzle to process.',
            default: new Date().getFullYear().toString(),
            expects: Array.from(
                { length: 10 },
                (_, i) => (2015 + i).toString(),
            ),
        },
        part: {
            aliases: ['p'],
            description: 'which part(s) of the puzzle to process.',
            default: 'both',
            expects: ['both', '1', '2'],
        },
        iterations: {
            aliases: ['i'],
            description: 'how many time to run for the profiler.',
            default: '10',
            expects: ['1', '3', '10'],
        },
        fake: {
            aliases: ['f'],
            description: 'if we submit it to the website or not.',
            default: 'false',
            expects: ['true', 'false'],
        },
    },
};

const getPrompt = (): string => {
    let prompt = '\tcommands:\n';

    Object.entries(commandLineInfo.commands).forEach(([command, info]) => {
        const aliases = info.aliases.join(', ');
        const args = info.arguments.map((arg) => `--${arg}=${arg}`).join(' ');

        prompt += `\t\t${GREEN_COLOR}${command} ${RED_COLOR}${args}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}aliases: ${DEFAULT_COLOR}${aliases}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}description: ${DEFAULT_COLOR}${info.description}\n`;
    });

    prompt += '\targuments:\n';
    Object.entries(commandLineInfo.arguments).forEach(([argument, info]) => {
        const aliases = info.aliases.map((alias) => `--${alias}`).join(', ');
        const expects = info.expects.join(', ');

        prompt += `\t\t${GREEN_COLOR}--${argument}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}aliases: ${DEFAULT_COLOR}${aliases}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}description: ${DEFAULT_COLOR}${info.description}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}expects: ${DEFAULT_COLOR}${expects}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}default: ${DEFAULT_COLOR}${info.default}\n`;
    });

    return prompt;
};

const handleCommandLine = (args: string[]): void => {
    console.log(
        `\n${YELLOW_COLOR}~~~ ${GREEN_COLOR}advent of code manager ${RED_COLOR}v3.0.0 ${DEFAULT_COLOR}(created by alex prosser) ${YELLOW_COLOR}~~~${DEFAULT_COLOR}\n`,
    );

    if (args.length === 0) {
        console.log(getPrompt());
        return;
    }

    const commandName = args[0];
    const command = Object.entries(commandLineInfo.commands).find(
        ([name, info]) => name === commandName || info.aliases.includes(commandName),
    );

    if (!command) {
        console.log(
            `${RED_COLOR}error: unknown command '${commandName}'${DEFAULT_COLOR}`,
        );
        console.log(getPrompt());
        return;
    }

    const [_commandKey, commandInfo] = command;
    const commandArgs: Partial<CommandArguments> = {};

    args.slice(1).forEach((arg) => {
        if (arg.startsWith('--')) {
            const [key, value] = arg.slice(2).split('=');
            const argument = Object.entries(commandLineInfo.arguments).find(
                ([name, info]) => name === key || info.aliases.includes(key),
            );

            if (argument) {
                const [argKey, argInfo] = argument;

                if (argInfo.expects.includes(value)) {
                    commandArgs[argKey as keyof CommandArguments] = value;
                } else {
                    console.log(
                        `${RED_COLOR}error: invalid value '${value}' for argument '${key}'${DEFAULT_COLOR}`,
                    );
                    console.log(getPrompt());
                    return;
                }
            } else {
                console.log(
                    `${RED_COLOR}error: unknown argument '${key}'${DEFAULT_COLOR}`,
                );
                console.log(getPrompt());
                return;
            }
        }
    });

    commandInfo.arguments.forEach((arg) => {
        if (!commandArgs[arg as keyof CommandArguments]) {
            commandArgs[arg as keyof CommandArguments] = commandLineInfo.arguments[arg].default;
        }
    });

    commandInfo.command(commandArgs as CommandArguments);
};

handleCommandLine(Deno.args);

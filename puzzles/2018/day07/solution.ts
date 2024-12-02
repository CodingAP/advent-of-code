/**
 * puzzles/2018/day07/solution.ts
 *
 * ~~ The Sum of Its Parts ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/1/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse the tree to get the steps before hand
    const tree = input.trim().split('\n').reduce<{ [key: string]: string[] }>((obj, line) => {
        const tokens = line.split(' ');
        if (obj[tokens[7]] === undefined) obj[tokens[7]] = [];
        if (obj[tokens[1]] === undefined) obj[tokens[1]] = [];
        obj[tokens[7]].push(tokens[1]);
        return obj;
    }, {});

    let order = '';

    // grab the first character that is finished
    while (order.length !== Object.keys(tree).length) {
        const finished = Object.entries(tree)
            .filter(task => task[1].length === 0 && !order.includes(task[0]))
            .map(task => task[0])
            .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
        
        Object.keys(tree).forEach(task => {
            tree[task] = tree[task].filter(item => item !== finished[0]);
        });

        order += finished[0];
    }

    return order;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse the tree to get the steps before hand
    const tree = input.trim().split('\n').reduce<{ [key: string]: string[] }>((obj, line) => {
        const tokens = line.split(' ');
        if (obj[tokens[7]] === undefined) obj[tokens[7]] = [];
        if (obj[tokens[1]] === undefined) obj[tokens[1]] = [];
        obj[tokens[7]].push(tokens[1]);
        return obj;
    }, {});

    let order = '';

    // send the characters to the workers
    const workers: { task: string, time: number }[] = new Array(5).fill('').map(_ => ({ task: '', time: -1 }));
    let time = 0;
    while (order.length !== Object.keys(tree).length) {
        const finished = Object.entries(tree)
            .filter(task => task[1].length === 0 && !order.includes(task[0]) && !workers.map(worker => worker.task).includes(task[0]))
            .map(task => task[0])
            .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

        for (let i = 0; i < workers.length; i++) {
            if (workers[i].task === '') {
                const task = finished.shift();
                if (task !== undefined) {
                    workers[i].task = task;
                    workers[i].time = task.charCodeAt(0) - 'A'.charCodeAt(0) + 60;
                }
            } else {
                workers[i].time--;
                if (workers[i].time === 0) {
                    Object.keys(tree).forEach(task => {
                        tree[task] = tree[task].filter(item => item !== workers[i].task);
                    });

                    order += workers[i].task;

                    workers[i] = { task: '', time: -1 };
                }
            }
        }
        time++;
    }

    return time;
};

export { part1, part2 };

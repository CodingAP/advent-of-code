/**
 * puzzles/2018/day04/solution.ts
 *
 * ~~ Repose Record ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/1/2024
 */

/**
 * returns the date as a number
 * 
 * @param dateString - string in YYYY-MM-DD hh:mm
 * @returns total time in minutes as one number
 */
const parseDate = (dateString: string): number => {
    const [date, time] = dateString.split(' ');
    const [year, month, day] = date.split('-').map(num => parseInt(num));
    const [hour, minute] = time.split(':').map(num => parseInt(num));

    return year * 525600 + month * 43800 + day * 1440 + hour * 60 + minute;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // convert dates to number for sorting
    const shifts = input.trim().split('\n').map(line => {
        const [date, event] = line.replace(/\[/g, '').split(']').map(line => line.trim());
        return { date: parseDate(date), event };
    });

    shifts.sort((a, b) => a.date - b.date);

    // find all the minutes each guard was sleeping
    const guardSleep: { [key: string]: number[] } = {};
    let currentGuard = -1, startSleep = -1;
    for (let i = 0; i < shifts.length; i++) {
        if (shifts[i].event.includes('begins shift')) currentGuard = parseInt(shifts[i].event.split(' ')[1].replace(/#/g, ''));
        else if (shifts[i].event.includes('falls asleep')) startSleep = shifts[i].date % 60;
        else if (shifts[i].event.includes('wakes up')) {
            // the range of sleeping and waking is only between 00:00 and 00:59
            const endSleep = shifts[i].date % 60;
            if (guardSleep[currentGuard] === undefined) guardSleep[currentGuard] = new Array(60).fill(0);
            for (let i = startSleep; i < endSleep; i++) guardSleep[currentGuard][i]++;
        }
    }

    // find the guard with the maximum sleep time
    const guards = Object.keys(guardSleep);
    let maxSleepGuard = '', maxSleepTime = -1;
    guards.forEach(guard => {
        const total = guardSleep[guard].reduce((sum, num) => sum + num, 0);
        if (maxSleepGuard === '' || maxSleepTime < total) {
            maxSleepGuard = guard;
            maxSleepTime = total;
        }
    });

    // find the minute the maximum sleeping guard slept the most
    let maxMinute = 0;
    for (let i = 1; i < guardSleep[maxSleepGuard].length; i++) {
        if (guardSleep[maxSleepGuard][i] > guardSleep[maxSleepGuard][maxMinute]) maxMinute = i;
    }

    return parseInt(maxSleepGuard) * maxMinute;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // convert dates to number for sorting
    const shifts = input.trim().split('\n').map(line => {
        const [date, event] = line.replace(/\[/g, '').split(']').map(line => line.trim());
        return { date: parseDate(date), event };
    });

    shifts.sort((a, b) => a.date - b.date);

    // find all the minutes each guard was sleeping
    const guardSleep: { [key: string]: number[] } = {};
    let currentGuard = -1, startSleep = -1;
    for (let i = 0; i < shifts.length; i++) {
        if (shifts[i].event.includes('begins shift')) currentGuard = parseInt(shifts[i].event.split(' ')[1].replace(/#/g, ''));
        else if (shifts[i].event.includes('falls asleep')) startSleep = shifts[i].date % 60;
        else if (shifts[i].event.includes('wakes up')) {
            // the range of sleeping and waking is only between 00:00 and 00:59
            const endSleep = shifts[i].date % 60;
            if (guardSleep[currentGuard] === undefined) guardSleep[currentGuard] = new Array(60).fill(0);
            for (let i = startSleep; i < endSleep; i++) guardSleep[currentGuard][i]++;
        }
    }

    // get the maximum minute of each guard, see which is the highest
    const guards = Object.keys(guardSleep);
    let maxSleepGuard = '', maxSleepTime = -1;
    guards.forEach(guard => {
        let maxMinute = 0;
        for (let i = 1; i < guardSleep[guard].length; i++) {
            if (guardSleep[guard][i] > guardSleep[guard][maxMinute]) maxMinute = i;
        }

        if (maxSleepGuard === '' || guardSleep[maxSleepGuard][maxSleepTime] < guardSleep[guard][maxMinute]) {
            maxSleepGuard = guard;
            maxSleepTime = maxMinute;
        }
    });

    return parseInt(maxSleepGuard) * maxSleepTime;
};

export { part1, part2 };

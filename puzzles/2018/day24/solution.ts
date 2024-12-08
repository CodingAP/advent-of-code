/**
 * puzzles/2018/day24/solution.ts
 *
 * ~~ Immune System Simulator 20XX ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/8/2024
 */

interface Army {
    team: string;
    units: number;
    hitpoints: number;
    immune: string[];
    weak: string[];
    damageAmount: number;
    damageType: string;
    initiative: number;
}

const getPower = (attacking: Army, defending: Army) => {
    const isImmune = defending.immune.includes(attacking.damageType);
    const isWeak = defending.weak.includes(attacking.damageType);

    let power = attacking.units * attacking.damageAmount;
    if (isImmune) power = 0;
    else if (isWeak) power *= 2;

    return power;
}

const countGroups = (groups: Army[]) => {
    const counter: { [key: string]: number } = {};
    for (let i = 0; i < groups.length; i++) counter[groups[i].team] = (counter[groups[i].team] || 0) + groups[i].units;
    return counter;
}

const parseInput = (input: string, immuneBoost: number): Army[] => {
    return input.trim().split('\n\n').flatMap((units, i) => units.split('\n').slice(1).map(line => {
        const tokens = /(\d+) units each with (\d+) hit points (.*)with an attack that does (\d+) (.+) damage at initiative (\d+)/.exec(line) as RegExpExecArray;
        let immune: string[] = [], weak: string[] = [];
        tokens[3].trim().replace(/[\(\)]/g, '').split('; ').forEach(type => {
            const typeTokens = type.replace(/[,]/g, '').split(' ');
            if (typeTokens[0] === 'immune') immune = typeTokens.slice(2);
            if (typeTokens[0] === 'weak') weak = typeTokens.slice(2);
        });
        return { team: (i === 0) ? 'immune' : 'infection', units: parseInt(tokens[1]), hitpoints: parseInt(tokens[2]), immune, weak, damageAmount: parseInt(tokens[4]) + (i === 0 ? immuneBoost : 0), damageType: tokens[5], initiative: parseInt(tokens[6]) }
    }));
}

/**
 * simulate a fight between the groups
 * return null when a stalemate happens, a negative number for a infection win, a position number when immune wins
 */
const simulateFight = (groups: Army[]): number | null => {
    // simulate a fight
    while (true) {
        const previous = JSON.stringify(countGroups(groups));

        // sort based on attack order
        groups.sort((a, b) => {
            if (b.units * b.damageAmount === a.units * a.damageAmount) return b.initiative - a.initiative;
            return b.units * b.damageAmount - a.units * a.damageAmount;
        });

        const allAttacks: { attacking: number, defending: number, power: number }[] = [];
        for (let i = 0; i < groups.length; i++) {
            // ignore dead groups
            if (groups[i].units === 0) continue;

            // choose best attack
            const attacks: { attacking: number, defending: number, power: number }[] = [];
            for (let j = 0; j < groups.length; j++) {
                if (groups[i].team === groups[j].team || groups[j].units === 0) continue;
                const power = getPower(groups[i], groups[j]);
                if (power !== 0) attacks.push({ attacking: i, defending: j, power });
            }

            // choose based on highest damage, then highest power, then highest initiative
            attacks.sort((a, b) => {
                const aGroup = groups[a.defending];
                const bGroup = groups[b.defending];

                if (b.power === a.power) {
                    if (bGroup.units * bGroup.damageAmount === aGroup.units * aGroup.damageAmount) return bGroup.initiative - aGroup.initiative;
                    return bGroup.units * bGroup.damageAmount - aGroup.units * aGroup.damageAmount;
                }
                return b.power - a.power;
            });

            // find first unique target to attack
            for (let i = 0; i < attacks.length; i++) {
                const isAttacked = allAttacks.find(attack => attack.defending === attacks[i].defending);
                if (isAttacked === undefined) {
                    allAttacks.push(attacks[i]);
                    break;
                }
            }
        }

        allAttacks.sort((a, b) => groups[b.attacking].initiative - groups[a.attacking].initiative);

        // run all the attacks
        for (let i = 0; i < allAttacks.length; i++) {
            // don't try to kill already dead groups
            if (groups[allAttacks[i].defending].units === 0) continue;

            // attack the group
            const power = getPower(groups[allAttacks[i].attacking], groups[allAttacks[i].defending]);
            groups[allAttacks[i].defending].units = Math.max(groups[allAttacks[i].defending].units - Math.floor(power / groups[allAttacks[i].defending].hitpoints), 0);
        }

        // check for infinite state
        const counter = countGroups(groups);
        if (previous == JSON.stringify(counter)) return null;

        // return results if an army is killed
        if (counter.immune === 0 || counter.infection === 0) return counter.immune - counter.infection;
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const groups = parseInput(input, 0);
    return -(simulateFight(groups) as number);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let boost = 0;
    while (true) {
        // check for an immune win
        const result = simulateFight(parseInput(input, boost++));
        if (result !== null && result > 0) return result;
    };
};

export { part1, part2 };

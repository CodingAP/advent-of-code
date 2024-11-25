// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day21/solution.ts
 * 
 * ~~ RPG Simulator 20XX ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/28/2023
 */

/**
 * produces the cartesian product of the arguments
 * 
 * @param  {...any} a any amount of arrays
 * @returns {any[][]}
 */
const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

/**
 * all the shops with cost and modifiers
 */
const shops = {
    weapons: {
        dagger: { cost: 8, damage: 4, armor: 0 },
        shortsword: { cost: 10, damage: 5, armor: 0 },
        warhammer: { cost: 25, damage: 6, armor: 0 },
        longsword: { cost: 40, damage: 7, armor: 0 },
        greataxe: { cost: 74, damage: 8, armor: 0 }
    },
    armor: {
        none: { cost: 0, damage: 0, armor: 0 },
        leather: { cost: 13, damage: 0, armor: 1 },
        chainmail: { cost: 31, damage: 0, armor: 2 },
        splintmail: { cost: 53, damage: 0, armor: 3 },
        bandedmail: { cost: 75, damage: 0, armor: 4 },
        platemail: { cost: 102, damage: 0, armor: 5 }
    },
    rings: {
        none: { cost: 0, damage: 0, armor: 0 },
        damage1: { cost: 25, damage: 1, armor: 0 },
        damage2: { cost: 50, damage: 2, armor: 0 },
        damage3: { cost: 100, damage: 3, armor: 0 },
        defense1: { cost: 20, damage: 0, armor: 1 },
        defense2: { cost: 40, damage: 0, armor: 2 },
        defense3: { cost: 80, damage: 0, armor: 3 }
    }
};

/**
 * simulate a battle with the stats given
 * 
 * @param {{ health: number, damage: number, armor: number }} player the player stats 
 * @param {{ health: number, damage: number, armor: number }} boss the boss stats 
 * @returns {boolean}
 */
const simulateBattle = (player, boss) => {
    let playerTurn = true;

    while (player.health > 0 && boss.health > 0) {
        let attacker = (playerTurn) ? player : boss;
        let victim = (playerTurn) ? boss : player;
        victim.health -= Math.max(attacker.damage - victim.armor, 1);
        playerTurn = !playerTurn;
    }

    return player.health > 0;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    let [bossHitPoints, bossDamage, bossArmor] = input.split(/\n/g).map(line => parseInt(line.split(': ')[1]));

    // try all possible combinations of items
    let minimum = Infinity;
    let allPossible = cartesian(Object.keys(shops.weapons), Object.keys(shops.armor), Object.keys(shops.rings), Object.keys(shops.rings));
    for (let i = 0; i < allPossible.length; i++) {
        if (allPossible[i][2] == allPossible[i][3] && allPossible[i][2] != 'none') continue;

        let player = { health: 100, damage: 0, armor: 0 }, cost = 0;
        let shopOrder = ['weapons', 'armor', 'rings', 'rings'];
        for (let j = 0; j < shopOrder.length; j++) {
            cost += shops[shopOrder[j]][allPossible[i][j]].cost;
            player.damage += shops[shopOrder[j]][allPossible[i][j]].damage;
            player.armor += shops[shopOrder[j]][allPossible[i][j]].armor;
        }
        
        let win = simulateBattle(player, { health: bossHitPoints, damage: bossDamage, armor: bossArmor });
        if (win) minimum = Math.min(minimum, cost);
    }

    return minimum;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse input
    let [bossHitPoints, bossDamage, bossArmor] = input.split(/\n/g).map(line => parseInt(line.split(': ')[1]));

    // try all possible combinations of items
    let maximum = -Infinity;
    let allPossible = cartesian(Object.keys(shops.weapons), Object.keys(shops.armor), Object.keys(shops.rings), Object.keys(shops.rings));
    for (let i = 0; i < allPossible.length; i++) {
        if (allPossible[i][2] == allPossible[i][3] && allPossible[i][2] != 'none') continue;

        let player = { health: 100, damage: 0, armor: 0 }, cost = 0;
        let shopOrder = ['weapons', 'armor', 'rings', 'rings'];
        for (let j = 0; j < shopOrder.length; j++) {
            cost += shops[shopOrder[j]][allPossible[i][j]].cost;
            player.damage += shops[shopOrder[j]][allPossible[i][j]].damage;
            player.armor += shops[shopOrder[j]][allPossible[i][j]].armor;
        }

        let win = simulateBattle(player, { health: bossHitPoints, damage: bossDamage, armor: bossArmor });
        if (!win) maximum = Math.max(maximum, cost);
    }

    return maximum;
}

export { part1, part2 };
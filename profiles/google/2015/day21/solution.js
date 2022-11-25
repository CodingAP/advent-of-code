import { cartesian } from '../../../scripts/common.js';

let weapons = {
    dagger: { cost: 8, damage: 4 },
    shortsword: { cost: 10, damage: 5 },
    warhammer: { cost: 25, damage: 6 },
    longsword: { cost: 40, damage: 7 },
    greataxe: { cost: 74, damage: 8 }
}

let armor = {
    none: { cost: 0, armor: 0 },
    leather: { cost: 13, armor: 1 },
    chainmail: { cost: 31, armor: 2 },
    splintmail: { cost: 53, armor: 3 },
    bandedmail: { cost: 75, armor: 4 },
    platemail: { cost: 102, armor: 5 }
}

let rings = {
    none: { cost: 0, damage: 0, armor: 0 },
    damage1: { cost: 25, damage: 1, armor: 0 },
    damage2: { cost: 50, damage: 2, armor: 0 },
    damage3: { cost: 100, damage: 3, armor: 0 },
    defense1: { cost: 20, damage: 0, armor: 1 },
    defense2: { cost: 40, damage: 0, armor: 2 },
    defense3: { cost: 80, damage: 0, armor: 3 },
}

const part1 = async input => {
    let bossStats = input.split('\n').map(element => parseInt(element.split(': ')[1]));

    let minGold = Infinity;
    let allPossible = cartesian(Object.keys(weapons), Object.keys(armor), Object.keys(rings), Object.keys(rings));
    allPossible.forEach(equipment => {
        if (equipment[2] == equipment[3] && equipment[2] != 'none') return;
        
        let gold = 0;
        let player = { hitpoints: 100, damage: 0, armor: 0 };
        let boss = { hitpoints: bossStats[0], damage: bossStats[1], armor: bossStats[2] };

        player.damage = weapons[equipment[0]].damage + rings[equipment[2]].damage + rings[equipment[3]].damage;
        player.armor = armor[equipment[1]].armor + rings[equipment[2]].armor + rings[equipment[3]].armor;
        gold = weapons[equipment[0]].cost + armor[equipment[1]].cost + rings[equipment[2]].cost + rings[equipment[3]].cost;

        let done = false, win = false, playersTurn = true;
        while (!done) {
            let offense = playersTurn ? player : boss;
            let defense = playersTurn ? boss : player;

            defense.hitpoints -= Math.max(1, offense.damage - defense.armor);
            if (defense.hitpoints <= 0) {
                done = true;
                win = playersTurn;
            }

            playersTurn = !playersTurn;
        }

        if (win) minGold = Math.min(minGold, gold);
    });
    return minGold;
}

const part2 = async input => {
    let bossStats = input.split('\n').map(element => parseInt(element.split(': ')[1]));

    let maxGold = -Infinity;
    let allPossible = cartesian(Object.keys(weapons), Object.keys(armor), Object.keys(rings), Object.keys(rings));
    allPossible.forEach(equipment => {
        if (equipment[2] == equipment[3] && equipment[2] != 'none') return;

        let gold = 0;
        let player = { hitpoints: 100, damage: 0, armor: 0 };
        let boss = { hitpoints: bossStats[0], damage: bossStats[1], armor: bossStats[2] };

        player.damage = weapons[equipment[0]].damage + rings[equipment[2]].damage + rings[equipment[3]].damage;
        player.armor = armor[equipment[1]].armor + rings[equipment[2]].armor + rings[equipment[3]].armor;
        gold = weapons[equipment[0]].cost + armor[equipment[1]].cost + rings[equipment[2]].cost + rings[equipment[3]].cost;

        let done = false, win = false, playersTurn = true;
        while (!done) {
            let offense = playersTurn ? player : boss;
            let defense = playersTurn ? boss : player;

            defense.hitpoints -= Math.max(1, offense.damage - defense.armor);
            if (defense.hitpoints <= 0) {
                done = true;
                win = playersTurn;
            }

            playersTurn = !playersTurn;
        }

        if (!win) maxGold = Math.max(maxGold, gold);
    });
    return maxGold;
}

export { part1, part2 }; 
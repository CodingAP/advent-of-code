/**
 * aoc/puzzles/2015/day22/solution.js
 * 
 * ~~ Wizard Simulator 20XX ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/29/2023
 */

const spells = {
    magic_missile: {
        timer: 0,
        cost: 53,
        cast: (player, boss) => { boss.health -= 4; },
        activate: (player, boss) => {},
        finish: (player, boss) => {}
    },
    drain: {
        timer: 0,
        cost: 73,
        cast: (player, boss) => { player.health += 2; boss.health -= 2; },
        activate: (player, boss) => {},
        finish: (player, boss) => {}
    },
    shield: {
        timer: 6,
        cost: 113,
        cast: (player, boss) => { player.armor += 7; },
        activate: (player, boss) => {},
        finish: (player, boss) => { player.armor -= 7; }
    },
    poison: {
        timer: 6,
        cost: 173,
        cast: (player, boss) => {},
        activate: (player, boss) => { boss.health -= 3; },
        finish: (player, boss) => {}
    },
    recharge: {
        timer: 5,
        cost: 229,
        cast: (player, boss) => {},
        activate: (player, boss) => { player.mana += 101; },
        finish: (player, boss) => {}
    }
}

const doRound = (state, spell) => {
    // do current spell effects at player's turn
    state.currentSpells.forEach(spellInfo => {
        spells[spellInfo.name].activate(state.player, state.boss);
        spellInfo.timer--;
    });

    // cast new spell
    spells[spell].cast(state.player, state.boss);
    state.player.mana -= spells[spell].cost;
    state.manaCost += spells[spell].cost;
    state.currentSpells.push({ name: spell, timer: spells[spell].timer });

    // remove expired spells
    let ongoing = state.currentSpells.map(spellInfo => {
        if (spellInfo.timer <= 0) {
            spells[spellInfo.name].finish(state.player, state.boss);
            return null;
        }
        return spellInfo;
    });
    state.currentSpells = ongoing.filter(spell => spell);

    // do current spell effects at boss's turn
    state.currentSpells.forEach(spellInfo => {
        spells[spellInfo.name].activate(state.player, state.boss);
        spellInfo.timer--;
    });

    // remove expired spells
    ongoing = state.currentSpells.map(spellInfo => {
        if (spellInfo.timer <= 0) {
            spells[spellInfo.name].finish(state.player, state.boss);
            return null;
        }
        return spellInfo;
    });
    state.currentSpells = ongoing.filter(spell => spell);

    // stop if boss has died
    if (state.boss.health <= 0) return;

    // do boss damage
    state.player.health -= Math.max(state.boss.damage - state.player.armor, 1);
}

const simulateAllBattles = startingState => {
    let minimum = Infinity;

    const simulateBattle = (state, depth) => {
        // stop the battle if health or mana is removed or if the cost is too high
        if (state.player.health <= 0 || state.player.mana <= 0 || state.manaCost > minimum) return;
        
        if (state.boss.health <= 0) {
            // if boss dies, check to see how much mana it costs
            minimum = Math.min(minimum, state.manaCost);
            return;
        }

        // find all spells that can be casted and try them
        let availableSpells = Object.keys(spells).filter(spell => {
            for (let i = 0; i < state.currentSpells.length; i++) {
                if (spell == state.currentSpells[i].name || state.player.mana < spells[spell].cost) return false;
            }
            return true;
        });

        availableSpells.forEach(spellName => {
            let newState = structuredClone(state);
            doRound(newState, spellName);
            simulateBattle(newState, depth + 1);
        });
    }

    simulateBattle(startingState, 0);
    return minimum;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let [bossHitPoints, bossDamage] = input.split(/\n/g).map(line => parseInt(line.split(': ')[1]));

    const startingState = {
        player: { health: 50, armor: 0, mana: 500 },
        boss: { health: bossHitPoints, damage: bossDamage },
        currentSpells: [],
        manaCost: 0
    }
    
    return simulateAllBattles(startingState);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    return 0;
}

export { part1, part2 };
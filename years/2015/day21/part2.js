const input = require('fs').readFileSync('./years/2015/day21/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let player = { health: 100, attack: 0, armor: 0, gold: 0 };
    let boss = { health: 104, attack: 8, armor: 1 };

    let weapons = {
        dagger: { cost: 8, attack: 4, armor: 0 },
        shortsword: { cost: 10, attack: 5, armor: 0 },
        warhammer: { cost: 25, attack: 6, armor: 0 },
        longsword: { cost: 40, attack: 7, armor: 0 },
        greataxe: { cost: 74, attack: 8, armor: 0 }
    };

    let armors = {
        nothing: { cost: 0, attack: 0, armor: 0 },
        leather: { cost: 13, attack: 0, armor: 1 },
        chainmail: { cost: 31, attack: 0, armor: 2 },
        splintmail: { cost: 52, attack: 0, armor: 3 },
        bandedmail: { cost: 75, attack: 0, armor: 4 },
        platemail: { cost: 102, attack: 0, armor: 5 }
    };

    let rings = {
        nothing: { cost: 0, attack: 0, armor: 0 },
        damage1: { cost: 25, attack: 1, armor: 0 },
        damage2: { cost: 50, attack: 2, armor: 0 },
        damage3: { cost: 100, attack: 3, armor: 0 },
        defense1: { cost: 20, attack: 0, armor: 1 },
        defense2: { cost: 40, attack: 0, armor: 2 },
        defense3: { cost: 80, attack: 0, armor: 3 }
    };

    let buyItem = (name) => {
        let shop = null;
        if (weapons[name] != null) shop = weapons;
        if (armors[name] != null) shop = armors;
        if (rings[name] != null) shop = rings;
        if (shop == null) return;
        player.gold += shop[name].cost;
        player.attack += shop[name].attack;
        player.armor += shop[name].armor;
    }

    let fight = () => {
        boss.health -= Math.max(player.attack - boss.armor, 1);
        if (boss.health <= 0) return true;
        player.health -= Math.max(boss.attack - player.armor, 1);
        if (player.health <= 0) return false;
        return null;
    }

    let highestGold = -Infinity;
    for (let i = 0; i < 5; i++) {
        let weapon = Object.keys(weapons);
        for (let j = 0; j < 6; j++) {
            let armor = Object.keys(armors);
            for (let k = 0; k < 7; k++) {
                let ring1 = Object.keys(rings);
                for (let l = 0; l < 7; l++) {
                    if (l == k) continue;
                    let ring2 = Object.keys(rings);
                    buyItem(weapon[i]);
                    buyItem(armor[j]);
                    buyItem(ring1[k]);
                    buyItem(ring2[l]);
                    let win = null;
                    while (true) {
                        win = fight();
                        if (win != null) break;
                    }
                    if (!win) {
                        if (player.gold > highestGold) highestGold = player.gold;
                    }
                    player = { health: 100, attack: 0, armor: 0, gold: 0 };
                    boss = { health: 104, attack: 8, armor: 1 };
                }
            }
        }
    }

    return highestGold;
}
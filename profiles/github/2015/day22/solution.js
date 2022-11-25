const part1 = async input => {
    var bossStats = {
        hp: 71,
        damageAmt: 10,
    }

    class Player {
        constructor(initial, isWizard) {
            this.history = [];
            this.initial = initial;
            this.isWizard = !!isWizard;

            if (this.isWizard) {
                this.spells = [
                    {
                        cost: 53,
                        effect: (m, o) => o.damage(4),
                    },
                    {
                        cost: 73,
                        effect: (m, o) => { o.damage(2); m.hp += 2; },
                    },
                    {
                        cost: 113,
                        start: (m, o) => m.armor += 7,
                        effect: (m, o) => { },
                        end: (m, o) => m.armor -= 7,
                        duration: 6,
                    },
                    {
                        cost: 173,
                        effect: (m, o) => o.damage(3),
                        duration: 6,
                    },
                    {
                        cost: 229,
                        effect: (m, o) => m.mana += 101,
                        duration: 5,
                    },
                ];
            }

            this.start();
        }

        attack(opponent, spellIdx) {
            if (!this.isWizard) {
                opponent.damage(this.damageAmt);
            } else {
                this.history.push(spellIdx);
                var spell = this.spells[spellIdx];
                this.spent += spell.cost;
                this.mana -= spell.cost;

                if (spell.duration) {
                    var newSpell = {
                        idx: spellIdx,
                        effect: spell.effect,
                        duration: spell.duration,
                    };
                    if (spell.start) {
                        spell.start(this, opponent);
                    }
                    if (spell.end) {
                        newSpell.end = spell.end;
                    }
                    this.activeSpells.push(newSpell);
                } else {
                    spell.effect(this, opponent);
                }
            }
        }

        damage(n) {
            this.hp -= Math.max(1, n - this.armor);
        }

        duplicate() {
            var newPlayer = new Player(this.initial, this.isWizard);
            newPlayer.hp = this.hp;
            newPlayer.spent = this.spent;
            newPlayer.armor = this.armor;
            newPlayer.turn = this.turn;
            for (var i = 0; i < this.activeSpells.length; i++) {
                newPlayer.activeSpells.push(Object.assign({}, this.activeSpells[i]));
            }
            for (var i = 0; i < this.history.length; i++) {
                newPlayer.history.push(this.history[i]);
            }

            if (this.isWizard)
                newPlayer.mana = this.mana;
            else
                newPlayer.damageAmt = this.damageAmt;

            return newPlayer;
        }

        takeTurn(opponent) {
            this.turn++;

            for (var i = 0; i < this.activeSpells.length; i++) {
                var spell = this.activeSpells[i];

                if (spell.duration > 0) {
                    spell.effect(this, opponent);
                    spell.duration--;

                    if (spell.duration === 0 && spell.end) {
                        spell.end(this, opponent);
                    }
                }
            }
        }

        start() {
            this.hp = this.initial.hp;
            this.spent = 0;
            this.armor = 0;
            this.turn = 0;
            this.activeSpells = [];
            if (this.isWizard)
                this.mana = this.initial.mana;
            else
                this.damageAmt = this.initial.damageAmt;
        }
    }

    var me = new Player({ hp: 50, mana: 500 }, true);
    var boss = new Player(bossStats);

    var cheapestSpent = Infinity;

    function playAllGames(me, boss, partTwo, depth) {
        depth = depth || 0;
        for (var i = 0; i < me.spells.length; i++) {
            var spellMatch = false;
            for (var j = 0; j < me.activeSpells.length; j++) {
                if (me.activeSpells[j].duration > 1 && i === me.activeSpells[j].idx) {
                    spellMatch = true;;
                }
            }
            if (spellMatch)
                continue;
            if (me.spells[i].cost > me.mana) {
                continue;
            }

            var newMe = me.duplicate();
            var newBoss = boss.duplicate();

            if (partTwo)
                newMe.hp--;

            newMe.takeTurn(newBoss);
            newBoss.takeTurn(newMe);
            newMe.attack(newBoss, i);

            newMe.takeTurn(newBoss);
            newBoss.takeTurn(newMe);
            newBoss.attack(newMe);

            if (newBoss.hp <= 0) {
                cheapestSpent = Math.min(cheapestSpent, newMe.spent);
            }

            if (newMe.hp > (partTwo ? 1 : 0) && newBoss.hp > 0 && newMe.spent < cheapestSpent)
                playAllGames(newMe, newBoss, partTwo, depth + 1);
        }
    }

    playAllGames(me, boss);
    return cheapestSpent;
}

const part2 = async input => {
    var bossStats = {
        hp: 71,
        damageAmt: 10,
    }

    class Player {
        constructor(initial, isWizard) {
            this.history = [];
            this.initial = initial;
            this.isWizard = !!isWizard;

            if (this.isWizard) {
                this.spells = [
                    {
                        cost: 53,
                        effect: (m, o) => o.damage(4),
                    },
                    {
                        cost: 73,
                        effect: (m, o) => { o.damage(2); m.hp += 2; },
                    },
                    {
                        cost: 113,
                        start: (m, o) => m.armor += 7,
                        effect: (m, o) => { },
                        end: (m, o) => m.armor -= 7,
                        duration: 6,
                    },
                    {
                        cost: 173,
                        effect: (m, o) => o.damage(3),
                        duration: 6,
                    },
                    {
                        cost: 229,
                        effect: (m, o) => m.mana += 101,
                        duration: 5,
                    },
                ];
            }

            this.start();
        }

        attack(opponent, spellIdx) {
            if (!this.isWizard) {
                opponent.damage(this.damageAmt);
            } else {
                this.history.push(spellIdx);
                var spell = this.spells[spellIdx];
                this.spent += spell.cost;
                this.mana -= spell.cost;

                if (spell.duration) {
                    var newSpell = {
                        idx: spellIdx,
                        effect: spell.effect,
                        duration: spell.duration,
                    };
                    if (spell.start) {
                        spell.start(this, opponent);
                    }
                    if (spell.end) {
                        newSpell.end = spell.end;
                    }
                    this.activeSpells.push(newSpell);
                } else {
                    spell.effect(this, opponent);
                }
            }
        }

        damage(n) {
            this.hp -= Math.max(1, n - this.armor);
        }

        duplicate() {
            var newPlayer = new Player(this.initial, this.isWizard);
            newPlayer.hp = this.hp;
            newPlayer.spent = this.spent;
            newPlayer.armor = this.armor;
            newPlayer.turn = this.turn;
            for (var i = 0; i < this.activeSpells.length; i++) {
                newPlayer.activeSpells.push(Object.assign({}, this.activeSpells[i]));
            }
            for (var i = 0; i < this.history.length; i++) {
                newPlayer.history.push(this.history[i]);
            }

            if (this.isWizard)
                newPlayer.mana = this.mana;
            else
                newPlayer.damageAmt = this.damageAmt;

            return newPlayer;
        }

        takeTurn(opponent) {
            this.turn++;

            for (var i = 0; i < this.activeSpells.length; i++) {
                var spell = this.activeSpells[i];

                if (spell.duration > 0) {
                    spell.effect(this, opponent);
                    spell.duration--;

                    if (spell.duration === 0 && spell.end) {
                        spell.end(this, opponent);
                    }
                }
            }
        }

        start() {
            this.hp = this.initial.hp;
            this.spent = 0;
            this.armor = 0;
            this.turn = 0;
            this.activeSpells = [];
            if (this.isWizard)
                this.mana = this.initial.mana;
            else
                this.damageAmt = this.initial.damageAmt;
        }
    }

    var me = new Player({ hp: 50, mana: 500 }, true);
    var boss = new Player(bossStats);

    var cheapestSpent = Infinity;

    function playAllGames(me, boss, partTwo, depth) {
        depth = depth || 0;
        for (var i = 0; i < me.spells.length; i++) {
            var spellMatch = false;
            for (var j = 0; j < me.activeSpells.length; j++) {
                if (me.activeSpells[j].duration > 1 && i === me.activeSpells[j].idx) {
                    spellMatch = true;;
                }
            }
            if (spellMatch)
                continue;
            if (me.spells[i].cost > me.mana) {
                continue;
            }

            var newMe = me.duplicate();
            var newBoss = boss.duplicate();

            if (partTwo)
                newMe.hp--;

            newMe.takeTurn(newBoss);
            newBoss.takeTurn(newMe);
            newMe.attack(newBoss, i);

            newMe.takeTurn(newBoss);
            newBoss.takeTurn(newMe);
            newBoss.attack(newMe);

            if (newBoss.hp <= 0) {
                cheapestSpent = Math.min(cheapestSpent, newMe.spent);
            }

            if (newMe.hp > (partTwo ? 1 : 0) && newBoss.hp > 0 && newMe.spent < cheapestSpent)
                playAllGames(newMe, newBoss, partTwo, depth + 1);
        }
    }

    playAllGames(me, boss, true);
    return cheapestSpent;
}

export { part1, part2 };
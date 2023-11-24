const part1 = async input => {
    let blueprints = input.split('\n').reduce((array, line) => {
        let tokens = line.split(' ');
        array.push({
            ore: parseInt(tokens[6]),
            clay: parseInt(tokens[12]),
            obsidian: { ore: parseInt(tokens[18]), clay: parseInt(tokens[21]) },
            geode: { ore: parseInt(tokens[27]), obsidian: parseInt(tokens[30]) }
        });
        return array;
    }, []);

    return blueprints.reduce((acc, blueprint, index) => {
        let states = [{ robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 }, resources: { ore: 0, clay: 0, obsidian: 0, geode: 0 } }];

        for (let minute = 0; minute < 24; minute++) {
            let newStates = [];

            for (let state of states) {
                if (state.resources.ore >= blueprint.geode.ore && state.resources.obsidian >= blueprint.geode.obsidian) {
                    newStates.push({
                        robots: { ore: state.robots.ore, clay: state.robots.clay, obsidian: state.robots.obsidian, geode: state.robots.geode + 1 },
                        resources: {
                            ore: (state.resources.ore + state.robots.ore) - blueprint.geode.ore,
                            clay: state.resources.clay + state.robots.clay,
                            obsidian: (state.resources.obsidian + state.robots.obsidian) - blueprint.geode.obsidian,
                            geode: state.resources.geode + state.robots.geode
                        }
                    });
                }

                if (state.resources.ore >= blueprint.obsidian.ore && state.resources.clay >= blueprint.obsidian.clay) {
                    newStates.push({
                        robots: { ore: state.robots.ore, clay: state.robots.clay, obsidian: state.robots.obsidian + 1, geode: state.robots.geode },
                        resources: {
                            ore: (state.resources.ore + state.robots.ore) - blueprint.obsidian.ore,
                            clay: (state.resources.clay + state.robots.clay) - blueprint.obsidian.clay,
                            obsidian: state.resources.obsidian + state.robots.obsidian,
                            geode: state.resources.geode + state.robots.geode
                        }
                    });
                }

                if (state.resources.ore >= blueprint.clay) {
                    newStates.push({
                        robots: { ore: state.robots.ore, clay: state.robots.clay + 1, obsidian: state.robots.obsidian, geode: state.robots.geode },
                        resources: {
                            ore: (state.resources.ore + state.robots.ore) - blueprint.clay,
                            clay: state.resources.clay + state.robots.clay,
                            obsidian: state.resources.obsidian + state.robots.obsidian,
                            geode: state.resources.geode + state.robots.geode
                        }
                    });
                }

                if (state.resources.ore >= blueprint.ore) {
                    newStates.push({
                        robots: { ore: state.robots.ore + 1, clay: state.robots.clay, obsidian: state.robots.obsidian, geode: state.robots.geode },
                        resources: {
                            ore: (state.resources.ore + state.robots.ore) - blueprint.ore,
                            clay: state.resources.clay + state.robots.clay,
                            obsidian: state.resources.obsidian + state.robots.obsidian,
                            geode: state.resources.geode + state.robots.geode
                        }
                    });
                }

                newStates.push({
                    robots: { ore: state.robots.ore, clay: state.robots.clay, obsidian: state.robots.obsidian, geode: state.robots.geode },
                    resources: {
                        ore: state.resources.ore + state.robots.ore,
                        clay: state.resources.clay + state.robots.clay,
                        obsidian: state.resources.obsidian + state.robots.obsidian,
                        geode: state.resources.geode + state.robots.geode
                    }
                });
            }

            let fitnesses = newStates.map(state => {
                return (state.resources.geode + ((24 - minute) * state.robots.geode)) * 10000000 +
                    state.robots.obsidian * 10000 +
                    state.robots.clay * 100 +
                    state.robots.ore;
            });

            states = newStates
                .map((state, i) => ({ state, fitness: fitnesses[i] }))
                .sort((a, b) => b.fitness - a.fitness)
                .map(fitness => fitness.state)
                .slice(0, 20000);
        }

        states.sort((a, b) => b.resources.geode - a.resources.geode);
        let maxGeode = states[0].resources.geode;
        return acc + (maxGeode * (index + 1));
    }, 0);
}

const part2 = async input => {
    let blueprints = input.split('\n').slice(0, 3).reduce((array, line) => {
        let tokens = line.split(' ');
        array.push({
            ore: parseInt(tokens[6]),
            clay: parseInt(tokens[12]),
            obsidian: { ore: parseInt(tokens[18]), clay: parseInt(tokens[21]) },
            geode: { ore: parseInt(tokens[27]), obsidian: parseInt(tokens[30]) }
        });
        return array;
    }, []);

    return blueprints.reduce((acc, blueprint, index) => {
        let states = [{ robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 }, resources: { ore: 0, clay: 0, obsidian: 0, geode: 0 } }];

        for (let minute = 0; minute < 32; minute++) {
            let newStates = [];

            for (let state of states) {
                if (state.resources.ore >= blueprint.geode.ore && state.resources.obsidian >= blueprint.geode.obsidian) {
                    newStates.push({
                        robots: { ore: state.robots.ore, clay: state.robots.clay, obsidian: state.robots.obsidian, geode: state.robots.geode + 1 },
                        resources: {
                            ore: (state.resources.ore + state.robots.ore) - blueprint.geode.ore,
                            clay: state.resources.clay + state.robots.clay,
                            obsidian: (state.resources.obsidian + state.robots.obsidian) - blueprint.geode.obsidian,
                            geode: state.resources.geode + state.robots.geode
                        }
                    });
                }

                if (state.resources.ore >= blueprint.obsidian.ore && state.resources.clay >= blueprint.obsidian.clay) {
                    newStates.push({
                        robots: { ore: state.robots.ore, clay: state.robots.clay, obsidian: state.robots.obsidian + 1, geode: state.robots.geode },
                        resources: {
                            ore: (state.resources.ore + state.robots.ore) - blueprint.obsidian.ore,
                            clay: (state.resources.clay + state.robots.clay) - blueprint.obsidian.clay,
                            obsidian: state.resources.obsidian + state.robots.obsidian,
                            geode: state.resources.geode + state.robots.geode
                        }
                    });
                }

                if (state.resources.ore >= blueprint.clay) {
                    newStates.push({
                        robots: { ore: state.robots.ore, clay: state.robots.clay + 1, obsidian: state.robots.obsidian, geode: state.robots.geode },
                        resources: {
                            ore: (state.resources.ore + state.robots.ore) - blueprint.clay,
                            clay: state.resources.clay + state.robots.clay,
                            obsidian: state.resources.obsidian + state.robots.obsidian,
                            geode: state.resources.geode + state.robots.geode
                        }
                    });
                }

                if (state.resources.ore >= blueprint.ore) {
                    newStates.push({
                        robots: { ore: state.robots.ore + 1, clay: state.robots.clay, obsidian: state.robots.obsidian, geode: state.robots.geode },
                        resources: {
                            ore: (state.resources.ore + state.robots.ore) - blueprint.ore,
                            clay: state.resources.clay + state.robots.clay,
                            obsidian: state.resources.obsidian + state.robots.obsidian,
                            geode: state.resources.geode + state.robots.geode
                        }
                    });
                }

                newStates.push({
                    robots: { ore: state.robots.ore, clay: state.robots.clay, obsidian: state.robots.obsidian, geode: state.robots.geode },
                    resources: {
                        ore: state.resources.ore + state.robots.ore,
                        clay: state.resources.clay + state.robots.clay,
                        obsidian: state.resources.obsidian + state.robots.obsidian,
                        geode: state.resources.geode + state.robots.geode
                    }
                });
            }

            let fitnesses = newStates.map(state => {
                return (state.resources.geode + ((32 - minute) * state.robots.geode)) * 10000000 +
                    state.robots.obsidian * 10000 +
                    state.robots.clay * 100 +
                    state.robots.ore;
            });

            states = newStates
                .map((state, i) => ({ state, fitness: fitnesses[i] }))
                .sort((a, b) => b.fitness - a.fitness)
                .map(fitness => fitness.state)
                .slice(0, 20000);
        }

        let maxGeode = states[0].resources.geode;
        return acc * maxGeode;
    }, 1);
}

export { part1, part2 };
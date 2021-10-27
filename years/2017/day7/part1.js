module.exports = input => {
    let programNames = [];
    let programsWParents = {};

    input.split('\n').forEach(element => {
        let tokens = element.replace(/ /g, '').split('->');

        let children = (tokens[1]) ? tokens[1].split(',') : [];
        let parent = tokens[0].split('(')[0];

        programNames.push(parent);
        children.forEach(child => {
            programsWParents[child] = { parent };
        });
    });

    programNames = programNames.filter(element => !Object.keys(programsWParents).includes(element));
    return programNames[0];
}
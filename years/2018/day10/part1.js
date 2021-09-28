module.exports = input => {
    let initial = input.split('\n');
    let particles 
    for (let i = 0; i < particles.length; i++) {
        let tokens = particles[i].replace(/[\s]/g, '').split(/[<>]/);

        let position = tokens[1].split(',').map(value => parseInt(value));
        let velocity = tokens[3].split(',').map(value => parseInt(value));
    }

    return 0;
}
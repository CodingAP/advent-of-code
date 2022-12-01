const part1 = async input => {
    let particles = input.split('\n').reduce((array, element) => {
        let [position, velocity, acceleration] = element.split(', ').map(vector => vector.split('=')[1].replace(/[<>]/g, '').split(',').map(num => parseInt(num)));
        array.push({ position, velocity, acceleration });
        return array;
    }, []);

    for (let i = 0; i < 1000; i++) {
        particles.map(particle => {
            particle.velocity[0] += particle.acceleration[0];
            particle.velocity[1] += particle.acceleration[1];
            particle.velocity[2] += particle.acceleration[2];

            particle.position[0] += particle.velocity[0];
            particle.position[1] += particle.velocity[1];
            particle.position[2] += particle.velocity[2];

            return particle;
        });
    }

    return particles.reduce((smallest, current, index) => {
        let smallestDistance = particles[smallest].position.reduce((acc, num) => acc + Math.abs(num), 0);
        if (current.position.reduce((acc, num) => acc + Math.abs(num), 0) < smallestDistance) return index;
        return smallest; 
    }, 0);
}

const part2 = async input => {
    let particles = input.split('\n').reduce((array, element) => {
        let [position, velocity, acceleration] = element.split(', ').map(vector => vector.split('=')[1].replace(/[<>]/g, '').split(',').map(num => parseInt(num)));
        array.push({ position, velocity, acceleration });
        return array;
    }, []);

    for (let i = 0; i < 1000; i++) {
        let positions = {};
        particles.map((particle, index) => {
            particle.velocity[0] += particle.acceleration[0];
            particle.velocity[1] += particle.acceleration[1];
            particle.velocity[2] += particle.acceleration[2];

            particle.position[0] += particle.velocity[0];
            particle.position[1] += particle.velocity[1];
            particle.position[2] += particle.velocity[2];

            if (positions[particle.position.join(',')] == null) positions[particle.position.join(',')] = [];
            positions[particle.position.join(',')].push(index);

            return particle;
        });

        Object.values(positions).filter(element => element.length >= 2).forEach(array => {
            array.forEach(index => particles[index] = null);
        });

        particles = particles.filter(element => element);
    }

    return particles.length;
}

export { part1, part2 };
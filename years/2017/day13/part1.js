const common = require('../../../scripts/common');
const input = common.readInput('./years/2017/day13/input.txt');

module.exports = () => {
    let sockets = [];
    input.split('\n').forEach(socket => {
        let tokens = socket.split(': ');
        sockets[parseInt(tokens[0])] = { position: 0, depth: parseInt(tokens[1]), velocity: 1 };
    });

    let position = -1;
    let severity = 0;

    for (let i = 0; i < sockets.length; i++) {
        position++;
        if (sockets[position] && sockets[position].position == 0) severity += sockets[position].depth * position;

        for (let j = 0; j < sockets.length; j++) {
            if (sockets[j] == null) continue;
            sockets[j].position += sockets[j].velocity;
            if (sockets[j].position == 0 || sockets[j].position == sockets[j].depth - 1) sockets[j].velocity *= -1;
        }
    }
    return severity;
}
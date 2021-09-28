const common = require('../../../scripts/common');

module.exports = input => {
    let sockets = [];
    input.split('\n').forEach(socket => {
        let tokens = socket.split(': ');
        sockets[parseInt(tokens[0])] = { position: 0, depth: parseInt(tokens[1]), velocity: 1 };
    });

    let testDelay = delay => {
        let initial = common.copy(sockets);
        let position = -1;
        let severity = 0;

        for (let i = 0; i < delay; i++) {
            for (let j = 0; j < sockets.length; j++) {
                if (sockets[j] == null) continue;
                sockets[j].position += sockets[j].velocity;
                if (sockets[j].position == 0 || sockets[j].position == sockets[j].depth - 1) sockets[j].velocity *= -1;
            }
        }

        let worked = true;

        for (let i = 0; i < sockets.length; i++) {
            position++;
            if (sockets[position] && sockets[position].position == 0) worked = false;

            for (let j = 0; j < sockets.length; j++) {
                if (sockets[j] == null) continue;
                sockets[j].position += sockets[j].velocity;
                if (sockets[j].position == 0 || sockets[j].position == sockets[j].depth - 1) sockets[j].velocity *= -1;
            }

            if (!worked) break;
        }
        
        sockets = initial;
        return worked;
    }

    let times = 0;
    while (true) {
        if (testDelay(times)) break;
        times++;
    }

    return times;
}
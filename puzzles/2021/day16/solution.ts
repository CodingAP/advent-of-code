/**
 * puzzles/2021/day16/solution.ts
 *
 * ~~ Packet Decoder ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

interface Packet {
    version: number;
    typeID: number;
    value: number;
    subpackets: Packet[];
};

const parsePackets = (data: string) => {
    let packets = [];
    while (data.includes('1')) {
        let result = parsePacket(data);
        packets.push(result.packet);
        data = result.data;
    }
    return packets;
}

const parsePacket = (data: string): { packet: Packet, data: string } => {
    const version = parseInt(data.slice(0, 3), 2);
    data = data.slice(3);

    const typeID = parseInt(data.slice(0, 3), 2);
    data = data.slice(3);

    let value = -1;
    const subpackets: Packet[] = [];

    if (typeID === 4) {
        let rawValue = '';
        while (true) {
            rawValue += data.slice(1, 5);

            const prefix = data[0];
            data = data.slice(5);
            if (prefix === '0') break;
        }

        value = parseInt(rawValue, 2);
    } else {
        let lengthType = data[0];
        data = data.slice(1);

        if (lengthType === '0') { // 15 bits
            let numOfBits = parseInt(data.slice(0, 15), 2);
            data = data.slice(15);

            subpackets.push(...parsePackets(data.slice(0, numOfBits)));
            data = data.slice(numOfBits);
        } else { // 11 bits
            let numOfNewPackets = parseInt(data.slice(0, 11), 2);
            data = data.slice(11);
            
            for (let i = 0; i < numOfNewPackets; i++) {
                let result = parsePacket(data);
                subpackets.push(result.packet);
                data = result.data;
            }
        }
    }

    return { packet: { version, typeID, value, subpackets }, data };
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const rawData = input.trim().split('').map(hex => parseInt(hex, 16).toString(2).padStart(4, '0')).join('');

    let countVersions = (packet: Packet) => {
        let total = packet.version;
        if (packet.subpackets.length === 0) return total;

        for (let i = 0; i < packet.subpackets.length; i++) {
            total += countVersions(packet.subpackets[i]);
        }

        return total;
    }

    return countVersions(parsePackets(rawData)[0]);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const rawData = input.trim().split('').map(hex => parseInt(hex, 16).toString(2).padStart(4, '0')).join('');
    const completePacket = parsePackets(rawData)[0];
    
    let solvePacket = (packet: Packet) => {
        // get all packets to type 4
        for (let i = 0; i < packet.subpackets.length; i++) {
            if (packet.subpackets[i].typeID !== 4) solvePacket(packet.subpackets[i]);
        }

        // solve the packet
        switch (packet.typeID) {
            case 0:
                packet.value = packet.subpackets.reduce((sum, packet) => sum + packet.value, 0);
                break;
            case 1:
                packet.value = packet.subpackets.reduce((mul, packet) => mul * packet.value, 1);
                break;
            case 2:
                packet.value = Math.min(...packet.subpackets.map(packet => packet.value));
                break;
            case 3:
                packet.value = Math.max(...packet.subpackets.map(packet => packet.value));
                break;
            case 5:
                packet.value = (packet.subpackets[0].value > packet.subpackets[1].value) ? 1 : 0;
                break;
            case 6:
                packet.value = (packet.subpackets[0].value < packet.subpackets[1].value) ? 1 : 0;
                break;
            case 7:
                packet.value = (packet.subpackets[0].value === packet.subpackets[1].value) ? 1 : 0;
                break;
        }

        packet.typeID = 4;
    }

    solvePacket(completePacket);
    return completePacket.value;
};

export { part1, part2 };

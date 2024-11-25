module.exports = input => {
    let rawData = '';
    for (let i = 0; i < input.length; i++) {
        rawData += parseInt(input[i], 16).toString(2).padStart(4, '0');
    }

    let parsePacket = data => {
        let packet = {};
        packet.version = parseInt(data.slice(0, 3), 2);
        data = data.slice(3);

        packet.typeID = parseInt(data.slice(0, 3), 2);
        data = data.slice(3);

        packet.value = '';
        packet.subpackets = [];

        if (packet.typeID == 4) {
            while (true) {
                packet.value += data.slice(1, 5);
                let prefix = data[0];
                data = data.slice(5);
                if (prefix == '0') break;
            }

            packet.value = parseInt(packet.value, 2);
        } else {
            let lengthType = data[0];
            data = data.slice(1);

            if (lengthType == '0') { // 15 bits
                let numOfBits = parseInt(data.slice(0, 15), 2);
                data = data.slice(15);

                packet.subpackets.push(...parsePackets(data.slice(0, numOfBits)));
                data = data.slice(numOfBits);
            } else { // 11 bits
                let numOfNewPackets = parseInt(data.slice(0, 11), 2);
                data = data.slice(11);

                for (let i = 0; i < numOfNewPackets; i++) {
                    let result = parsePacket(data);
                    packet.subpackets.push(result.packet);
                    data = result.newData;
                }
            }
        }

        return { packet, newData: data };
    }

    let parsePackets = data => {
        let packets = [];
        while (data.includes('1')) {
            let result = parsePacket(data);
            packets.push(result.packet);
            data = result.newData;
        }
        return packets;
    }

    let completePacket = parsePackets(rawData)[0];
    
    let solvePacket = packet => {
        // get all packets to type 4
        for (let i = 0; i < packet.subpackets.length; i++) {
            if (packet.subpackets[i].typeID != 4) solvePacket(packet.subpackets[i]);
        }

        // solve the packet
        switch (packet.typeID) {
            case 0:
                let sum = 0;
                for (let i = 0; i < packet.subpackets.length; i++) {
                    sum += packet.subpackets[i].value;
                }
                packet.value = sum;
                break;
            case 1:
                let mult = 1;
                for (let i = 0; i < packet.subpackets.length; i++) {
                    mult *= packet.subpackets[i].value;
                }
                packet.value = mult;
                break;
            case 2:
                let min = Infinity;
                for (let i = 0; i < packet.subpackets.length; i++) {
                    min = Math.min(packet.subpackets[i].value, min);
                }
                packet.value = min;
                break;
            case 3:
                let max = -Infinity;
                for (let i = 0; i < packet.subpackets.length; i++) {
                    max = Math.max(packet.subpackets[i].value, max);
                }
                packet.value = max;
                break;
            case 5:
                packet.value = (packet.subpackets[0].value > packet.subpackets[1].value) ? 1 : 0;
                break;
            case 6:
                packet.value = (packet.subpackets[0].value < packet.subpackets[1].value) ? 1 : 0;
                break;
            case 7:
                packet.value = (packet.subpackets[0].value == packet.subpackets[1].value) ? 1 : 0;
                break;
        }

        packet.typeID = 4;
    }

    solvePacket(completePacket);
    return completePacket.value;
}
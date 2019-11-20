let raw = require('raw-socket');

class Ping {
    constructor(destinationIp){
        this.socket =    raw.createSocket({
            protocol: raw.Protocol.ICMP
        });
        this.destinationIp = destinationIp;
        this.packet = null;
    }

    sendPing(){
        this.packet = Buffer.alloc(8);

        //write version
        this.packet.writeUInt8(8, 0);

        //write code
        this.packet.writeUInt8(0, 1);

        //write identifier
        this.packet.writeUInt8(0x00, 4);
        this.packet.writeUInt8(0x01, 5);

        //write sequence number
        this.packet.writeUInt8(0x0a, 6);
        this.packet.writeUInt8(0x09, 7);

        //writes checksum
        let sum = raw.createChecksum(this.packet);
        this.packet.writeUInt16BE(sum, 2);

        this.socket.send(this.packet, 0, this.packet.length, this.destinationIp, function () {}, function () {});
    }

    sendLargePingPacket(){
        this.packet = Buffer.alloc(1000);

        //write version
        this.packet.writeUInt8(8, 0);

        //write code
        this.packet.writeUInt8(0, 1);

        //write identifier
        this.packet.writeUInt8(0x00, 4);
        this.packet.writeUInt8(0x01, 5);

        //write sequence number
        this.packet.writeUInt8(0x0a, 6);
        this.packet.writeUInt8(0x09, 7);

        this.packet.fill(1, 8, this.packet.length);
        console.log(this.packet);

        //writes checksum
        let sum = raw.createChecksum(this.packet);
        this.packet.writeUInt16BE(sum, 2);

        this.socket.send(this.packet, 0, this.packet.length, this.destinationIp, function () {}, function () {});
    }
}

module.exports = Ping;
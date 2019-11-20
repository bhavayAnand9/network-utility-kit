let raw = require('raw-socket');

class Ping {
    constructor(destinationIp) {
        this.socket = raw.createSocket({
            protocol: raw.Protocol.ICMP
        });
        this.destinationIp = destinationIp;
        this.packet = null;
    }

    sendPingPacket() {
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

        //payload
        var payload = new Buffer([
                0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68
            ]
        );

        var bufArray = [this.packet, payload];

        let segment = Buffer.concat(bufArray);

        let sum = raw.createChecksum(segment);
        segment.writeUInt16BE(sum, 2);

        console.log(segment);

        this.socket.send(segment, 0, segment.length, this.destinationIp, function () {
        }, function () {
        });

    }
}


// // ICMP echo (ping) request, checksum should be ok
// var buffer = new Buffer ([
//     type        code        checksum
//     0x08, 0x00, 0x43, 0x52, 0x00, 0x01, 0x0a, 0x09,
//     0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68,
//     0x69, 0x6a, 0x6b, 0x6c, 0x6d, 0x6e, 0x6f, 0x70,
//     0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x61,
//     0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69]);
//
// var socketLevel = raw.SocketLevel.IPPROTO_IP
// var socketOption = raw.SocketOption.IP_TTL;
//
// function beforeSend () {
//     socket.setOption (socketLevel, socketOption, 1);
// }
//
// function afterSend (error, bytes) {
//     if (error)
//         console.log (error.toString ());
//     else
//         console.log ("sent " + bytes + " bytes");
//
//     socket.setOption (socketLevel, socketOption, 1);
// }
//
// socket.send (buffer, 0, buffer.length, target, beforeSend, afterSend);

module.exports = Ping;
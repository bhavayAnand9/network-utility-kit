'use strict';

let raw = require('raw-socket');
let crypto = require('crypto');

class Udp
{
    constructor(destinationPort, dstIp){
        this.socket =    raw.createSocket({
            protocol: raw.Protocol.UDP
        });
        this.destinationPort = destinationPort;
        this.destinationIp = dstIp;
        this.seqCounter = 0;
        this.ackCounter = 0;

        this.beforecb = () => {};
        this.aftercb = () => {};

        this.packet = this.buildSyncPacket();
    }

    //generates pseudo header for checksum calculation
    genPseudoHeader(dstIp, tcpPacketLength) {
        let pseudoHeader = new Buffer(12);
        pseudoHeader.fill(0);
        pseudoHeader.writeUInt32BE((Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)), 0);
        pseudoHeader.writeUInt32BE(dstIp, 4);
        pseudoHeader.writeUInt8(6, 9);
        pseudoHeader.writeUInt16BE(tcpPacketLength, 10);
        return pseudoHeader;
    }

    //builds a syn packet buffer
    buildUdpPacket() {
        let buf = Buffer.alloc(8);

        //writes source and destination port
        buf.writeUInt16BE(Math.floor(Math.random() * 65535) + 1, 0);
        buf.writeUInt16BE(this.destinationPort, 2);

        //writes length
        buf.writeUInt16BE(64, 4);

        //creates checksum of pseudo header using raw-socket
        let sum = raw.createChecksum(this.genPseudoHeader(this.destinationIp, buf.length), buf);

        //write above generated checksum
        buf.writeUInt16BE(sum, 6);

        return buf;
    }

    sendUdp(){
        this.socket.send(this.packet, 0, this.packet.length, this.destinationIp, this.beforecb, this.aftercb);
    }

    sendNumberOfUdp(howMany) {
        while(howMany--){
            this.socket.send(this.packet, 0, this.packet.length, this.destinationIp, this.beforecb, this.aftercb);
            this.packet = this.buildUdpPacket();
        }
    }

}

module.exports = Udp;
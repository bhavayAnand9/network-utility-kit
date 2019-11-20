let Ping = require('./ping');

let c = new Ping('15.206.102.11');

c.sendPingPacket();


// let raw = require('raw-socket');
// var buffer = new Buffer ([
//     0x08, 0x00, 0x5c, 0x60, 0x00, 0x01, 0x0a, 0x09,
//     0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68]);
//
// console.log(buffer);
//
// var socket = raw.createSocket({
//     protocol: raw.Protocol.ICMP
// });
//
// socket.send (buffer, 0, buffer.length, '15.206.102.11', beforeSend, afterSend);
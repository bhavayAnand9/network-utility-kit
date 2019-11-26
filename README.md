
A network-utility-kit providing support for low level socket implementation using raw-socket.

Includes: 

* PING - sends an ICMP echo req to a destination host
* TCP - transmission control protocol
* UDP - user datagram protocol
* SYN - a syn packet to destination as a 3-way handshake process

won't work on windows as windows don't support raw-sockets.

usage: 
````
let Ping = require('./ping');
let Syn = require('./syn');
let Tcp = require('./tcp');
let Udp = require('./udp')

// let c = new Ping('15.206.102.11');
// c.sendPing();

// let s = new Syn(80, '15.206.102.11');
// s.sendSyn();

// let t = new Tcp(80, '15.206.102.11');
// t.sendTcp();

// let u = new Udp(80, '15.206.102.11');
// u.sendUdp();
````



notes to self:\
    0000 0000 00000000 00000000 50 02 20 00 00000000\
    00101000 00000000 00010000 00000000\
    50 00 20 00
    
    0000 0000 0000 0000 0000 0000 50002000 0000 0000
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const iotaUtils = require('iota.lib.js/lib/utils/utils');
const zmq = require('zeromq');
const sock = zmq.socket('sub');

sock.connect('tcp://node04.iotatoken.nl:5556');
sock.subscribe('tx');
sock.subscribe('sn');
sock.subscribe('ms');

app.use("/", express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})


io.on('connection', function(socket){
  sock.on('message', msg => {
    const data = msg.toString().split(' ');
    const tx = iotaUtils.transactionObject(data[1], data[0]);
    console.info(formatTimestamp(tx.timestamp*1000) + '\t' + formatTimestamp(tx.attachmentTimestamp) + '\t' + tx.hash);
  });
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
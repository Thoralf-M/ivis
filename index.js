var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const iotaUtils = require('iota.lib.js/lib/utils/utils');
const zmq = require('zeromq');
const sock = zmq.socket('sub');

sock.connect('tcp://trinity.iota-tangle.io:5556');
sock.subscribe('tx_trytes');
sock.subscribe('sn');
sock.subscribe('ms');

app.use("/", express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

var txCount = 0;
var initTx = [];
var initSn = [];
var initMs = [];

sock.on('message', msg => {  
  //console.log(txCount);    
  const data = msg.toString().split(' ');
  //console.log(data[2] + " " + data[1]);    
  switch (data[0]) {
    case 'sn':
        initSn.push({ hash: data[1]})
        if (initSn.length > 1000) {
          initSn.shift();
        }
        console.log("sn: " + initSn.length);  
      break
    default:              
      const tx = iotaUtils.transactionObject(data[1], data[0]);    
      var txObj = { 
        hash: tx.hash, 
        transaction_trunk: tx.branchTransaction,  
        transaction_branch: tx.branchTransaction,
        bundle_hash: tx.bundle,
        tag: tx.tag,
        value: tx.value
      };
      if (data[0] === "tx_trytes") {
        initTx.push(txObj)
        if (initTx.length > 1000) {
          initTx.shift();
        }
        console.log("tx: " + initTx.length);  
      } else {
        initMs.push(txObj)
        if (initMs.length > 1000) {
          initMs.shift();
        }
        console.log("ms: " + initMs.length);  
      }
      break
    }    
});


io.on('connection', function(socket){    
  socket.emit('inittx', initTx);
  socket.emit('initsn', initSn);
  socket.emit('initms', initMs);  
  sock.on('message', msg => {        
    const data = msg.toString().split(' ');
    switch (data[0]) {
      case 'sn':
        socket.emit('sn', data[1]);
        break
      default:                
        const tx = iotaUtils.transactionObject(data[1], data[0]);    
        var txObj = { 
          hash: tx.hash, 
          transaction_trunk: tx.branchTransaction,  
          transaction_branch: tx.branchTransaction,
          bundle_hash: tx.bundle,
          tag: tx.tag,
          value: tx.value
        };
        if (data[0] === "tx_trytes") {               
          socket.emit('tx', txObj);
        } else {
          socket.emit('ms', txObj);
        }
        break
      }  
    //console.log(tx.hash);        
  });
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
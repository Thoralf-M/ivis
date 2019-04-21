const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const iotaUtils = require('iota.lib.js/lib/utils/utils');
const zmq = require('zeromq');

const sock = zmq.socket('sub');

sock.connect('tcp://perma-1.iota.partners:5556');
sock.subscribe('tx_trytes');
sock.subscribe('sn');
sock.subscribe('lmhs');

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const initLimit = 20000;
const initTx = [];
const initSn = [];
const initMs = [];

sock.on('message', (msg) => {
  // console.log(txCount);
  const data = msg.toString().split(' ');
  // console.log(data[2] + " " + data[1]);
  switch (data[0]) {
    case 'sn':
      initSn.push({ hash: data[1] });
      if (initSn.length > initLimit) {
        initSn.shift();
      }
      console.log(`sn: ${initSn.length}`);
      break;
    case 'lmhs':
      initMs.push(data[1]);
      if (initMs.length > initLimit) {
        initMs.shift();
      }
      console.log(`ms: ${initMs.length}`);
      break;
    default:
      const tx = iotaUtils.transactionObject(data[1], data[0]);
      const txObj = {
        hash: tx.hash,
        transaction_trunk: tx.trunkTransaction,
        transaction_branch: tx.branchTransaction,
        bundle_hash: tx.bundle,
        current_index: tx.currentIndex,
        last_index: tx.lastIndex,
        address: tx.address,
        tag: tx.tag,
        value: tx.value,
      };
      initTx.push(txObj);
      if (initTx.length > initLimit) {
        initTx.shift();
      }
      console.log(`tx: ${initTx.length}`);
      break;
  }
});


io.on('connection', (socket) => {
  socket.emit('inittx', initTx);
  socket.emit('initsn', initSn);
  socket.emit('initms', initMs);
  sock.on('message', (msg) => {
    const data = msg.toString().split(' ');
    switch (data[0]) {
      case 'sn':
        socket.emit('sn', { hash: data[1] });
        break;
      case 'lmhs':
        socket.emit('ms', data[1]);
        break;
      default:
        const tx = iotaUtils.transactionObject(data[1], data[0]);
        const txObj = {
          hash: tx.hash,
          transaction_trunk: tx.trunkTransaction,
          transaction_branch: tx.branchTransaction,
          bundle_hash: tx.bundle,
          current_index: tx.currentIndex,
          last_index: tx.lastIndex,
          address: tx.address,
          tag: tx.tag,
          value: tx.value,
        };
        socket.emit('tx', txObj);
        break;
    }
    // console.log(tx.hash);
  });
});

server.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = {getSocketOutside}
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const zmq = require('zeromq');
const sock = zmq.socket('sub');
const { sendTx, sendMs, sendBlowball, sendParasiteChain, sendSidetangle} = require('./lib');
const { pushToInitTxs, getInitTx, getInitSn, getInitMs, pushToInitMs} = require('./tangle');


sock.connect('tcp://perma-1.iota.partners:5556');
sock.subscribe('tx_trytes');
sock.subscribe('sn');
sock.subscribe('lmhs');

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

//call it outside so it only runs one time
var socketOutside
function getSocketOutside(){
  return socketOutside
}
var runs = false
function spam() {
  if (runs == true) {
    console.log("Spamming already");
    return
  } else {
    runs = true
  }
  setInterval(async () => {
    for (let j = 0; j < 3; j++) {
      sendTx().then(txs => {
        for (tx of txs) {
          let txObj = {
            hash: tx.hash,
            transaction_trunk: tx.trunkTransaction,
            transaction_branch: tx.branchTransaction,
            bundle_hash: tx.bundle,
            current_index: tx.currentIndex,
            last_index: tx.lastIndex,
            address: tx.address,
            tag: tx.tag,
            value: tx.value,
            timestamp: tx.timestamp
          };
          socketOutside.emit('tx', txObj);
          pushToInitTxs(txObj);
        }
      }).catch(e => console.log(e))
    }
    // runs = false
  }, 3000)
}

var milestones = false
function issueMilestones() {
  if (milestones == true) {
    console.log("Sending already milestones");
    return
  } else {
    milestones = true
  }
  setInterval(() => {
    sendMs().then(txs => {
      // console.log(txs);
      for (tx of txs) {
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
          timestamp: tx.timestamp
        };
        socketOutside.emit('tx', txObj);
        socketOutside.emit('ms', txObj.hash)
        pushToInitMs(txObj.hash)
        pushToInitTxs(txObj);
      }
    }).catch(e => console.log(e))

    // milestones = false
  }, 30000)
}

var blowballruns = false
function blowball() {
  if (blowballruns == true) {
    console.log("Spamming already");
    return
  } else {
    blowballruns = true
  }
  setInterval(async () => {
    for (let j = 0; j < 3; j++) {
      sendBlowball().then(txs => {
        for (tx of txs) {
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
            timestamp: tx.timestamp
          };
          socketOutside.emit('tx', txObj);
          pushToInitTxs(txObj);
        }
      }).catch(e => console.log(e))
    }
    // blowballruns = false
  }, 1000)
}

var sidetangleruns = false
function sendSidetangleStart() {
  if (sidetangleruns == true) {
    console.log("Spamming already");
    return
  } else {
    sidetangleruns = true
  }
  setInterval(async () => {
    for (let j = 0; j < 1; j++) {
      sendSidetangle(300, 4).then(txs => {

      }).catch(e => console.log(e))
    }
    // sidetangleruns = false
  }, 20000)
}
var parasiteChainRuns = false
function parasiteChain() {
  if (parasiteChainRuns == true) {
    console.log("Spamming already");
    return
  } else {
    parasiteChainRuns = true
  }
  setInterval(async () => {
    for (let j = 0; j < 1; j++) {
      sendParasiteChain(7).then(txs => {
        for (tx of txs) {
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
            timestamp: tx.timestamp
          };
          socketOutside.emit('tx', txObj);
          pushToInitTxs(txObj);
        }
      }).catch(e => console.log(e))
    }
    // parasiteChainRuns = false
  }, 1000)
}

io.on('connection', (socket) => {
  socketOutside = socket
  spam()
  // blowball()
  // parasiteChain()
  // sendSidetangleStart()
  issueMilestones()

  console.log(getInitTx().length);
  // console.log(getInitTx());
  socket.emit('inittx', getInitTx());
  socket.emit('initsn', getInitSn());
  socket.emit('initms', getInitMs());
});

server.listen(3000, () => {
  console.log('Listening on port 3000!');
});

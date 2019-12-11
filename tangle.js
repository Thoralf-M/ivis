module.exports = { getTransactionsToApprove, getBadTransactionsToApprove, pushToInitTxs, pushToTips, getInitTx, getInitSn, getInitMs, updateReferencedTx, pushToInitMs, getLatestMilestoneToApprove, getSecondLatestMilestoneToApprove }

const msRangeToReference = 3
const initLimit = 20000;
const TipsLimit = 250
let Tips = ['9'.repeat(81)]
let initTx = [{
  "hash": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "address": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "value": 0,
  "current_index": 0,
  "last_index": 0,
  "bundle": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "transaction_trunk": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "transaction_branch": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "tag": "999999999999999999999999999",
  "referencedMsIndex": 0
}];
let initTxObjects = {
  "999999999999999999999999999999999999999999999999999999999999999999999999999999999": {
    "hash": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "address": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "value": 0,
    "current_index": 0,
    "last_index": 0,
    "bundle": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "transaction_trunk": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "transaction_branch": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "tag": "999999999999999999999999999",
    "height": 0,
    "referencedMsIndex": 0
  }
}
let unconfirmedTxs = {
  "999999999999999999999999999999999999999999999999999999999999999999999999999999999": {
    "hash": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "address": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "value": 0,
    "current_index": 0,
    "last_index": 0,
    "bundle": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "transaction_trunk": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "transaction_branch": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "tag": "999999999999999999999999999",
    "height": 0,
    "referencedMsIndex": 0
  }
}
let unconfirmedTxHashes = ['9'.repeat(81)]
let unconfirmedTxHashesByHeight = [{
  "hash": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "address": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "value": 0,
  "current_index": 0,
  "last_index": 0,
  "bundle": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "transaction_trunk": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "transaction_branch": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "tag": "999999999999999999999999999",
  "height": 0,
  "referencedMsIndex": 0
}]
let initSn = [];
let initMs = ['9'.repeat(81)];
let msIndex = [0];

function pushToInitTxs(txObj) {
  //timestamp
  // txObj.observedTs = Date.now()/1000
  if (txObj.tag == 'MS9999999999999999999999999') {
    //set own own index if ms
    txObj.referencedMsIndex = msIndex[msIndex.length - 1] + 1
    msIndex.push(txObj.referencedMsIndex)
    console.log("new ms index " + txObj.referencedMsIndex);
  } else {
    //add highest ms from referenced txs
    let trunkIndex = initTxObjects[txObj.transaction_trunk].referencedMsIndex
    let branchIndex = initTxObjects[txObj.transaction_branch].referencedMsIndex
    let higherMs = (trunkIndex > branchIndex) ? trunkIndex : branchIndex
    txObj.referencedMsIndex = higherMs
    // if(txObj.tag.slice(0, 10) == 'SIDETANGLE'){
    //   console.log(txObj.referencedMsIndex);
    // }
  }

  initTxObjects[txObj.hash] = txObj
  initTx.push(txObj)
  //push only txs in valid range
  if (msIndex.length > msRangeToReference) {
    if (txObj.referencedMsIndex > msIndex[msIndex.length - msRangeToReference - 1]) {
      unconfirmedTxHashes.push(txObj.hash)
      unconfirmedTxs[txObj.hash] = txObj
    }
  } else {
    unconfirmedTxHashes.push(txObj.hash)
    unconfirmedTxs[txObj.hash] = txObj
  }

  if (initTx.length >= initLimit) {
    delete initTxObjects[initTx[0].hash]
    initTx.shift()
  }
  if (unconfirmedTxHashes.length >= TipsLimit) {
    delete unconfirmedTxs[unconfirmedTxHashes[0]]
    unconfirmedTxHashes.shift()
  }
  if (unconfirmedTxHashesByHeight.length >= TipsLimit) {
    unconfirmedTxHashesByHeight.shift()
  }
  //update height
  if (txObj.tag == 'MS9999999999999999999999999') {
    unconfirmedTxHashes.forEach(e => {
      unconfirmedTxs[e].height = Math.floor(unconfirmedTxs[e].height / 1.2) || 0
    })
  }
  updateHeight(txObj)
  // console.log("unconfirmedTxs: "+unconfirmedTxs.length);
  // console.log("unconfirmedTxHashes: "+unconfirmedTxHashes.length);
  // console.log("unconfirmedTxHashesByHeight: "+unconfirmedTxHashesByHeight.length);
  if (txObj.tag == 'MS9999999999999999999999999') {
    confirmTransactions(txObj)
    removeBadTxs()
  }
}

function removeBadTxs() {
  let badTxs = []
  if (msIndex.length > msRangeToReference) {
    unconfirmedTxHashes.forEach(e => {
      if (unconfirmedTxs[e].referencedMsIndex < msIndex[msIndex.length - msRangeToReference - 1]) {
        badTxs.push(e)
        delete unconfirmedTxs[e]
      }
    })
  }
  badTxs.forEach(e => {
    let index = unconfirmedTxHashes.indexOf(e)
    unconfirmedTxHashes.splice(index, 1)
  })
}

function updateHeight(txObj) {
  let txs = [txObj.hash, txObj.transaction_trunk, txObj.transaction_branch]
  while (txs.length > 0) {
    if (typeof unconfirmedTxs[txs[0]] != 'undefined') {
  // txs.push(unconfirmedTxs[txs[0]].transaction_trunk)
  // txs.push(unconfirmedTxs[txs[0]].transaction_branch)
  let trunkHeight = 0
  if (typeof unconfirmedTxs[unconfirmedTxs[txs[0]].transaction_trunk] != 'undefined') {
    if (typeof unconfirmedTxs[unconfirmedTxs[txs[0]].transaction_trunk].height != 'undefined') {
      trunkHeight = unconfirmedTxs[unconfirmedTxs[txs[0]].transaction_trunk].height
    }
  }
  let branchHeight = 0
  if (typeof unconfirmedTxs[unconfirmedTxs[txs[0]].transaction_branch] != 'undefined') {
    if (typeof unconfirmedTxs[unconfirmedTxs[txs[0]].transaction_branch].height != 'undefined') {
      branchHeight = unconfirmedTxs[unconfirmedTxs[txs[0]].transaction_branch].height
    }
    //set 0 if the same referenced tx
    if (typeof unconfirmedTxs[unconfirmedTxs[txs[0]].transaction_trunk] != 'undefined' && unconfirmedTxs[txs[0]].transaction_trunk == unconfirmedTxs[txs[0]].transaction_branch) {
      branchHeight = 0
      //punish bad behaviour
      trunkHeight = Math.floor(trunkHeight*0.1)
    }
  }
  //add other branch only a part because they could reference the same txs
  let height = (trunkHeight > branchHeight) ? (trunkHeight+branchHeight*0.1): (branchHeight+trunkHeight*0.1);
  if (typeof height == 'undefined') {
    height = 0
  }
  // console.log("height: "+height);
  if (typeof unconfirmedTxs[txs[0]].height == 'undefined') {
    unconfirmedTxs[txs[0]].height = height + 1
    // console.log("new height: "+unconfirmedTxs[txs[0]].height);
  }
  }
  txs.shift()
  }

  //timestamps
  // if (typeof unconfirmedTxs[txObj.hash] != 'undefined') {
  //   if (typeof unconfirmedTxs[txObj.hash].height == 'undefined') {
  //     let timestamp = unconfirmedTxs[txObj.hash].timestamp
  //     let observedTs = unconfirmedTxs[txObj.hash].observedTs
  //     // console.log("observedTs"+Math.min(0, timestamp - observedTs));
  //     unconfirmedTxs[txObj.hash].height = (Date.now()/1000) - observedTs - Math.min(0, timestamp - observedTs)
  //     // console.log("timestamp:"+timestamp);
  //     console.log("new height: " + unconfirmedTxs[txObj.hash].height);
  //   }
  // }
  //sort by height
  unconfirmedTxHashesByHeight = unconfirmedTxHashes.map(hash => unconfirmedTxs[hash])
  unconfirmedTxHashesByHeight.sort((a, b) => a.height - b.height)

}

function confirmTransactions(txObj) {
  let referencedTxs = [txObj.transaction_trunk, txObj.transaction_branch]
  while (referencedTxs.length > 0) {
    if (typeof unconfirmedTxs[referencedTxs[0]] != 'undefined') {
      referencedTxs.push(unconfirmedTxs[referencedTxs[0]].transaction_trunk)
      referencedTxs.push(unconfirmedTxs[referencedTxs[0]].transaction_branch)
      initSn.push(unconfirmedTxs[referencedTxs[0]])
    }
    let pos = unconfirmedTxHashes.indexOf(referencedTxs[0])
    if (pos != -1) {
      unconfirmedTxHashes.splice(pos, 1)
    }
    delete unconfirmedTxs[referencedTxs[0]]
    referencedTxs.shift()
  }
}

function pushToTips(hash) {
  Tips.push(hash)
  if (Tips.length >= TipsLimit) {
    Tips.shift()
  }
}

function pushToInitMs(hash) {
  initMs.push(hash)
}

function getInitTx() {
  return initTx
}
function getInitSn() {
  return initSn
}
function getInitMs() {
  return initMs
}

function updateReferencedTx(txHash) {
  let tipPos = Tips.indexOf(txHash)
  if (tipPos != -1) {
    Tips.splice(tipPos, 1);
  }
}
function getTransactionsToApprove() {
  return new Promise((resolve, reject) => {
    //remove non tipsel
    let tipsela = unconfirmedTxHashesByHeight.filter(e => Tips.indexOf(e.hash) != -1)
    let tipsel = tipsela.map(e => e.hash)
    //highest 30%
    // let twentyPercent = Math.floor(tipsel.length)
    let twentyPercent = Math.floor(tipsel.length * 0.1)
    let trunkPos = Math.floor(Math.random() * (tipsel.length - (tipsel.length - twentyPercent)) + tipsel.length - twentyPercent)
    let trunk
    if (tipsel.length > 10) {
      trunk = tipsel[trunkPos]
    } else {
      trunk = tipsel[tipsel.length - 1]
    }

    //highest 80%
    let fiftyPercent = Math.floor(tipsel.length * 1)
    let branchPos = Math.floor(Math.random() * (tipsel.length - (tipsel.length - fiftyPercent)) + tipsel.length - fiftyPercent)
    // let branchPos = Math.floor(Math.random() * tipsel.length)
    let branch
    if (tipsel.length > 5) {
      branch = tipsel[branchPos]
    } else {
      branch = tipsel[tipsel.length - 1]
    }
    // let branch = tipsel[branchPos]
    if (trunk == branch && tipsel.length > 1) {
      branch = tipsel[tipsel.length - 1]
    }
    //timestamp
    // function randomExponential(rate, randomUniform) {
    //   // http://en.wikipedia.org/wiki/Exponential_distribution#Generating_exponential_variates
    //   rate = rate || 1;
    
    //   // Allow to pass a random uniform value or function
    //   // Default to Math.random()
    //   var U = randomUniform;
    //   if (typeof randomUniform === 'function') U = randomUniform();
    //   if (!U) U = Math.random();
    
    //   let res = -Math.log(U)/rate
    //   if(res>1){
    //     return Math.random()
    //   } else{
    //     return -Math.log(U)/rate;
    //   }
    // }
    // // console.log(randomExponential(2));
    // let tiplist = unconfirmedTxHashesByHeight.reverse()
    // let trunk = Tips[Math.floor(randomExponential(2)*Tips.length)]
    // let branch = Tips[Math.floor(randomExponential(2)*Tips.length)]
    // console.log(trunk);
    // console.log(branch);

    // let branch = tipsel[0]
    resolve({
      "trunkTransaction": trunk,
      "branchTransaction": branch
    })
  });
}

function getLatestMilestoneToApprove() {
  return new Promise((resolve, reject) => {
    let ms = initMs[initMs.length - 1]
    resolve({
      "trunkTransaction": ms,
      "branchTransaction": ms
    })
  })
}

function getSecondLatestMilestoneToApprove() {
  return new Promise((resolve, reject) => {
    let ms
    if (initMs.length > 3) {
      ms = initMs[initMs.length - 2]
    } else {
      ms = '9'.repeat(81)
    }
    resolve({
      "trunkTransaction": ms,
      "branchTransaction": ms
    })
  })
}

function getBadTransactionsToApprove() {
  return new Promise((resolve, reject) => {
    //random tx from latest x txs
    let x = 150
    let trunkPos
    if (initTx.length > x) {
      trunkPos = Math.floor(Math.random() * (initTx.length - (initTx.length - x)) + initTx.length - x)
    } else {
      trunkPos = Math.floor(Math.random() * initTx.length)
    }
    // let trunkPos = Math.floor(Math.random() * initTx.length)
    let trunk = initTx[trunkPos].hash


    let branchPos
    if (initTx.length > x) {
      branchPos = Math.floor(Math.random() * (initTx.length - (initTx.length - x)) + initTx.length - x)
    } else {
      branchPos = Math.floor(Math.random() * initTx.length)
    }
    // let branchPos = Math.floor(Math.random() * initTx.length)
    let branch = initTx[branchPos].hash
    resolve({
      "trunkTransaction": trunk,
      "branchTransaction": branch
    })
  });
}
module.exports = {sendTx, sendMs, sendBlowball, sendParasiteChain, sendSidetangle}

const tx_converter = require('@iota/transaction-converter');
const core = require('@iota/core')
const converter = require('@iota/converter')
const {getTransactionsToApprove, getBadTransactionsToApprove, pushToInitTxs, pushToTips, updateReferencedTx, getLatestMilestoneToApprove, getSecondLatestMilestoneToApprove} = require('./tangle');
const iota = core.composeAPI({})
const seed = '9'.repeat(81)
const {getSocketOutside} =require('./index');

async function sendTx() {
  try {
    let transfers = [{
      value: 0,
      address: '9'.repeat(81),
      tag: 'TSA'
    }]
    var trytes = await iota.prepareTransfers(seed, transfers)
    var tips = await getTransactionsToApprove()
    var attachedTrytes = await attachToTangleWithoutPoW(tips.trunkTransaction, tips.branchTransaction, trytes)
    let txObj = attachedTrytes.map(e => tx_converter.asTransactionObject(e))
    pushToTips(txObj[0].hash)
    updateReferencedTx(tips.trunkTransaction)
    updateReferencedTx(tips.branchTransaction)
    // console.log('Transaction sent: ' + txObj[0].hash)
    return txObj
  } catch (e) {
    console.log(e)
  }
}

async function sendBlowball() {
  try {
    let transfers = [{
      value: 0,
      address: '9'.repeat(81),
      tag: 'BLOWBALL'
    }]
    var trytes = await iota.prepareTransfers(seed, transfers)
    // var tips = await getBadTransactionsToApprove()
    // var tips = await getLatestMilestoneToApprove()
    var tips = await getSecondLatestMilestoneToApprove()
    var attachedTrytes = await attachToTangleWithoutPoW(tips.trunkTransaction, tips.branchTransaction, trytes)
    let txObj = attachedTrytes.map(e => tx_converter.asTransactionObject(e))
    pushToTips(txObj[0].hash)
    updateReferencedTx(tips.trunkTransaction)
    updateReferencedTx(tips.branchTransaction)
    // console.log('Bad transaction sent: ' + txObj[0].hash)
    return txObj
  } catch (e) {
    console.log(e)
  }
}

async function sendParasiteChain(length) {
  try {
    let txs=[]
    let previousTxHash = '9'.repeat(81)
    for(let j=0; j<length; j++){
        let transfers = [{
          value: 0,
          address: '9'.repeat(81),
          tag: 'PARASITECHAIN'+converter.asciiToTrytes(`${j}`)
        }]
      let trytes = await iota.prepareTransfers(seed, transfers)
      let attachedTrytes = []
      if(j == 0){
        let tips = await getTransactionsToApprove()
        attachedTrytes = await attachToTangleWithoutPoW(tips.trunkTransaction, tips.branchTransaction, trytes)
      }else {
        attachedTrytes = await attachToTangleWithoutPoW(previousTxHash, previousTxHash, trytes)
      }
      let txObj = attachedTrytes.map(e => tx_converter.asTransactionObject(e))
      // console.log('ParasiteChaintransaction sent: ' + txObj[0].hash)
      txs.push(txObj[0])
      previousTxHash = txObj[0].hash
      pushToTips(txObj[0].hash)
      updateReferencedTx(txObj[0].trunkTransaction)
      updateReferencedTx(txObj[0].branchTransaction)
    }
    return txs
  } catch (e) {
    console.log(e)
  }
}

async function sendSidetangle(length, width) {
  try {
    let txs=[]
    let sidetangleTips
    for(let j=0; j<length; j++){
        let transfers = [{
          value: 0,
          address: '9'.repeat(81),
          tag: 'SIDETANGLE'+converter.asciiToTrytes(`${j}`)
        }]
      let trytes = await iota.prepareTransfers(seed, transfers)
      let attachedTrytes = []
      if(j == 0){
        let tips = await getTransactionsToApprove()
        attachedTrytes = await attachToTangleWithoutPoW(tips.trunkTransaction, tips.branchTransaction, trytes)
      }else {
        attachedTrytes = await attachToTangleWithoutPoW(sidetangleTips[Math.floor(Math.random()*sidetangleTips.length)], sidetangleTips[Math.floor(Math.random()*sidetangleTips.length)], trytes)
      }
      let txObj = attachedTrytes.map(e => tx_converter.asTransactionObject(e))
      // console.log('ParasiteChaintransaction sent: ' + txObj[0].hash)
      txs.push(txObj[0])
      if(j == 0){
        sidetangleTips = Array(width).fill(txObj[0].hash)
      } else {
        sidetangleTips.push(txObj[0].hash)
        sidetangleTips.shift()
      }
      pushToTips(txObj[0].hash)
      updateReferencedTx(txObj[0].trunkTransaction)
      updateReferencedTx(txObj[0].branchTransaction)
      let txObject = {
          hash: txObj[0].hash,
          transaction_trunk: txObj[0].trunkTransaction,
          transaction_branch: txObj[0].branchTransaction,
          bundle_hash: txObj[0].bundle,
          current_index: txObj[0].currentIndex,
          last_index: txObj[0].lastIndex,
          address: txObj[0].address,
          tag: txObj[0].tag,
          value: txObj[0].value,
          timestamp: txObj[0].timestamp
        };
      getSocketOutside().emit('tx', txObject);
      pushToInitTxs(txObject)
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    return txs
  } catch (e) {
    console.log(e)
  }
}

async function sendMs() {
  try {
    let transfers = [{
      value: 0,
      address: 'MILESTONEMILESTONEMILESTONEMILESTONEMILESTONEMILESTONEMILESTONEMILESTONEMILESTONE',
      tag: 'MS'
    }]
    var trytes = await iota.prepareTransfers(seed, transfers)
    var tips = await getTransactionsToApprove()
    var attachedTrytes = await attachToTangleWithoutPoW(tips.trunkTransaction, tips.branchTransaction, trytes)
    let txObj = attachedTrytes.map(e => tx_converter.asTransactionObject(e))
    pushToTips(txObj[0].hash)
    updateReferencedTx(tips.trunkTransaction)
    updateReferencedTx(tips.branchTransaction)
    console.log('Milestone sent: ' + txObj[0].hash)
    return txObj
  } catch (e) {
    console.log(e)
  }
}

async function attachToTangleWithoutPoW(trunkTransaction, branchTransaction, trytes) {
  const finalTrytes = [];
  let previousTransactionHash;
  // let zerotx = tx_converter.asTransactionObject(trytes[0])
  // if(zerotx.currentIndex == 0 && zerotx.latestIndex != 0){
  //   trytes.reverse()
  // }
  for (let i = 0; i < trytes.length; i++) {

      const tx = Object.assign({}, tx_converter.asTransactionObject(trytes[i]));
      tx.attachmentTimestamp = Date.now();
      tx.attachmentTimestampLowerBound = 0;
      tx.attachmentTimestampUpperBound = (Math.pow(3, 27) - 1) / 2;
      // If this is the first transaction, to be processed
      // Make sure that it's the last in the bundle and then
      // assign it the supplied trunk and branch transactions
      if (!previousTransactionHash) {
          tx.trunkTransaction = trunkTransaction;
          tx.branchTransaction = branchTransaction;
      } else {
          tx.trunkTransaction = previousTransactionHash;
          tx.branchTransaction = branchTransaction;
      }
      const newTrytes = tx_converter.asTransactionTrytes(tx);
      const returnTransaction = tx_converter.asTransactionObject(newTrytes);
      previousTransactionHash = returnTransaction.hash;
      finalTrytes.push(newTrytes);
  }
  return finalTrytes.reverse();
}
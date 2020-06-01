---
title: "Another Way To Build A Blockchain Section 8: The Miner"
path: "another-blockchain-guide-8"
cover: "../2018-04-04/chain.jpg"
chunk: "Guide on how to build a fully functional Blockchain using JavaScript."
date: "2018-04-11"
category: "Blockchain"
tags:
    - Cryptocurrency
    - JavaScript
---

## Create the Miner Class

Create a Miner class to tie all the concepts together. Create app/miner.js:

```js
class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    // include a reward transaction for the miner
    // create a block consisting of the valid transactions
    // synchronize chains in the peer-to-peer server
    // clear the transaction pool
    // broadcast to every miner to clear their transaction pools
  }
}

module.exports = Miner;
```

## Grab Valid Transactions

The first step to writing the mine function that we have in the Miner class is to add a validTransactions function for the TransactionPool. With this validTransactions function, return any transaction within the array of transactions that meets the following conditions. First, its total output amount matches the original balance specified in the input amount. Second, we’ll also verify the signature of every transaction to make sure that the data has not been corrupted after it was sent by the original sender. Add a function called validTransactions to transaction-pool.js:

```js
validTransactions() {
  return this.transactions.filter(transaction => {
    const outputTotal = transaction.outputs.reduce((total, output) => {
      return total + output.amount;
    }, 0);

    if (transaction.input.amount !== outputTotal) {
      console.log(`Invalid transaction from ${transaction.input.address}.`);
      return;
    }

    if (!Transaction.verifyTransaction(transaction)) {
      console.log(`Invalid signature from ${transaction.input.address}.`)
      return;
    };

    return transaction;
  });
}
```

Note that there is a dependency though on the Transaction class. So import the Transaction class at the top of the file:

```jsconst Transaction = require('../wallet/transaction');```

## Test Valid Transactions

Test the validTransactions function with transaction-pool.test.js. There is actually a feature that can shorten down on the number of lines. Recall that there is a function within the wallet class create a transaction based on a given address, amount, and transaction pool. The createTransaction also does the job of adding the created transaction to the pool. This is what is already done manually by creating the transaction and adding it to the pool. So we can reduce this with one call to wallet.createTransaction, and the same random address, amount, and tp transaction pool instance:

```js
// remove → transaction = Transaction.newTransaction(wallet, 'r4nd-4dr355', 30);
// remove → tp.updateOrAddTransaction(transaction);
transaction = wallet.createTransaction('r4nd-4dr355', 30, bc, tp);
```

To begin testing the validTransactions functionality, create a situation where there is a mix of valid and corrupt transactions. Capture the scenario with a new describe block:

```js
describe('mixing valid and corrupt transactions', () => {
  let validTransactions;
  beforeEach(() => {
    validTransactions = [...tp.transactions];
    for (let i=0; i<6; i++) {
      wallet = new Wallet();
      transaction = wallet.createTransaction('r4nd-4dr355', 30, bc, tp);
      if (i%2==0) {
        transaction.input.amount = 9999;
      } else {
        validTransactions.push(transaction);
      }
    }
  });

  it('shows a difference between valid and corrupt transactions', () => {
    expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
  });

  it('grabs valid transactions', () => {
    expect(tp.validTransactions()).toEqual(validTransactions);
  });
});
```

`$ npm run test`

Find the completed project [on my Github.](https://github.com/justinformentin/build-a-blockchain)
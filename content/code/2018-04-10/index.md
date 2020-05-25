---
title: "Another Way To Build A Blockchain Section 7: The Transaction Pool"
path: "another-blockchain-guide-7"
cover: "../2018-04-04/chain.jpg"
date: "2018-04-10"
chunk: "Guide on how to build a fully functional Blockchain using JavaScript."
category: "Blockchain"
tags:
    - Cryptocurrency
    - JavaScript
---

## Get Transactions

By giving each of users their own wallet, users of the application will have the ability to conduct transactions with each other, thus putting the cryptocurrency into action. Start in the index file of the app directory, where holds the main code for the interactive application: - Go to app/index.js

```js
...
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

...
const wallet = new Wallet();
const tp = new TransactionPool();

...
app.get('/transactions', (req, res) => {
  res.json(tp.transactions);
});
```

`$ npm run dev` - hit localhost:3001/transactions

#### Handle Messages in P2P Server

Update the messageHandler in the peer to peer server to handle different types of messages. In p2p-server.js:

```js
messageHandler(socket) {
  socket.on('message', message => {
    const data = JSON.parse(message);
    switch(data.type) {
      case MESSAGE_TYPES.chain:
        this.blockchain.replaceChain(data.chain);
        break;
      case MESSAGE_TYPES.transaction:
        this.transactionPool.updateOrAddTransaction(data.transaction);
        break;
    }
  ...
}
```

Now in app/index.js, use the broadcastTransaction function in the ‘/transact’ endpoint. That way, transactions are broadcasted to the network whenever new ones are made:

```js
p2pServer.broadcastTransaction(transaction);
```

Now start up a couple instances to test the new endpoint: `$ npm run dev` Second command line tab: `$ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev` Then post transactions. Hit localhost:3001/transact. Select POST for the type of request, and make sure the type of data is Raw, application/json. Then have a json body that consists of an arbitrary recipient, and a value around 50:

```js
{
  "recipient": "foo-address",
  "amount": 50
}
```

With those inputs loaded in, go ahead and click `Send` a couple times. Hit the transactions endpoint on both instances: - localhost:3001/transactions - localhost:3002/transactions Make a second POST transaction, this time with the second instance, http://localhost:3002/transact:

```js
{
  "recipient": "bar-address",
  "amount": 40
}
```

Hit the transactions endpoint on both instances: - localhost:3001/transactions - localhost:3002/transactions

## POST Transactions

Create the equivalent method that actually adds new transactions to the transaction pool, in app/index.js:

```js
app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, tp);
  res.redirect('/transactions');
});
```

`$ npm run dev` Test a POST request in postman, with raw application/json set as the Body data. Use some json similar to this for the data:

```js
{
  "recipient": "foo-address",
  "amount": 50
}
```

Hit the endpoint a couple times

## Public Key Endpoint

Make a new get request, under the endpoint, `public-key` to expose the address of an instance:

```js
app.get('/public-key', (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});
```

#### Test Transaction Pool

Test the Transaction Pool by creating a file called transaction-pool.test.js alongside the transaction-pool.js file.

```js
const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
  let tp, wallet, transaction;
  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = Transaction.newTransaction(wallet, 'r4nd-4dr355', 30);
    tp.updateOrAddTransaction(transaction);
  });

  it('adds a transaction to the pool', () => {
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);
    tp.updateOrAddTransaction(newTransaction);
    expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
      .not.toEqual(oldTransaction);
  });
});
```

`$ npm run test`

## Test Wallet Transactions

Create wallet/index.test.js

```js
const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');

describe('Wallet', () => {
  let wallet, tp;

  beforeEach(() => {
    wallet = new Wallet();
    tp = new TransactionPool();
  });

  describe('creating a transaction', () => {
    let transaction, sendAmount, recipient;
    beforeEach(() => {
      sendAmount = 50;
      recipient = 'r4nd0m-4ddr3s';
      transaction = wallet.createTransaction(recipient, sendAmount, tp);
    });

    describe('and doing the same transaction', () => {
      beforeEach(() => {
        wallet.createTransaction(recipient, sendAmount, tp);
      });

      it('doubles the `sendAmount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - sendAmount*2);
      });

      it('clones the `sendAmount` output for the recipient', () => {
        expect(transaction.outputs.filter(output => output.address === recipient)
          .map(output => output.amount)).toEqual([sendAmount, sendAmount]);
      });
    });
  });
});
```

`$ npm run test`

## Add to Transaction Pool

A transaction pool will collect all transactions submitted by individuals in the cryptocurrency network. Then, miners will do the work of taking transactions from the pool and including them in the blockchain. Create the transaction pool in the wallet directory with a file called transaction-pool.js:

```js
class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    let transactionWithId = this.transactions.find(t => t.id === transaction.id);
    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }
}

module.exports = TransactionPool;
```

The `updateOrAddTransaction` method by default will add an incoming transaction to the transactions array. However, there is the possibility that a transaction could come in that already exists in the array. Why? Recall that there is the ability to update transactions to have additional outputs. This means that a transaction could exist in the pool. However, if it gets updated, and is resubmitted to the pool, that transaction shouldn’t appear twice.

## Transaction Pool to P2P Server

Create the equivalent method that actually adds new transactions to the transaction pool, in app/index.js:

```js
app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, tp);
  res.redirect('/transactions');
});
```

`$ npm run dev` Test a POST request in postman, with raw application/json set as the Body data. Use some json similar to this for the data:

```js
{
  "recipient": "foo-address",
  "amount": 50
}
```

Hit the endpoint a couple times

## Transactions with Wallet

Create transactions with the Wallet class. Define a new method within the Wallet class called createTransaction with three parameters, a recipient, the amount for the transaction, and a transactionPool object. The function will assume an `existingTransaction` function exists for the transactionPool, to help replace existing transactions in the pool: In wallet/index.js:

```js
createTransaction(recipient, amount, transactionPool) {
  if (amount > this.balance) {
    console.log(`Amount: ${amount}, exceeds current balance: ${this.balance}`);
    return;
  }

  let transaction = transactionPool.existingTransaction(this.publicKey);
  if (transaction) {
    transaction.update(this, recipient, amount);
  } else {
    transaction = Transaction.newTransaction(this, recipient, amount);
    transactionPool.updateOrAddTransaction(transaction);
  }

  return transaction;
}
```

Make sure to import the Transaction class in wallet/index.js

```js
const Transaction = require('./transaction');
```

Add the existingTransaction function to transaction-pool.js:

```js
existingTransaction(address) {
   return this.transactions.find(transaction => transaction.input.address === address);
 }
 ```

Now onto the Miner. As always, you can find the completed project [on my Github.](https://github.com/justinformentin/build-a-blockchain)

___
## Go to the last page, [Part 8: the Miner](https://justinformentin.com/another-blockchain-guide-8)
---
title: "Another Way To Build A Blockchain Section 6: Create The Wallet"
path: "another-blockchain-guide-6"
cover: "../2018-04-04/chain.jpg"
date: "2018-04-09"
chunk: "Guide on how to build a fully functional Blockchain using JavaScript."
category: "Blockchain"
tags:
    - Cryptocurrency
    - JavaScript
---

## Create the Util Key Gen

To create the keyPair and publicKey objects objects, use a module called ‘elliptic’. Elliptic is a module in node that contains classes and methods that enable elliptic-curve based cryptography. Elliptic cryptography is an advanced mathematical subject, but essentially, it centers around the idea in that it is computationally infeasible and impossibly expensive to guess the answer to a randomly generated elliptic curve. Install elliptic as a dependency on the command line: `$ npm i elliptic --save` With the elliptic module installed, create a new file at the root of the project called chain-util.js. Within chain-util.js, create a ChainUtil class. The class will collect helper methods that expose common functions that wrap around functions from elliptic. A few classes in the project will use these functions. Also create an EC instance:

```js
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class ChainUtil {}

module.exports = ChainUtil;
```

Side note: in case you’re wondering, sec stands for standards of efficient cryptography. The p stands for prime, and 256 for 256 bits. In the elliptic-based algorithm itself, a key component is a prime number to generate the curve, and this prime number will be 256 bits, or 32 bytes/characters. K stands for Koblitz which is the name of a notable mathematician in the field of cryptography. And 1 stands for this being the first implementation of the curve algorithm in this standard. Add a new static genKeyPair method to this ChainUtil class, that returns a call to the identically-named genKeyPair method of the ec instance:

```js
class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }
}
```

Now within the wallet/index.js class, require the ChainUtil class. Use the `static genKeyPair` method to create a `keyPair` object within the constructor of the wallet. And then use this `keyPair` object to set the `publicKey`:

```js
const ChainUtil = require('../chain-util');

...
  this.keyPair = ChainUtil.genKeyPair();
  this.publicKey = this.keyPair.getPublic();
  ```

## Create the Transaction

Transactions objects represent exchanges in the cryptocurrency. They will consist of three primary components: 1) an input field which provides information about the sender of the transaction. 2) output fields which detail how much currency the sender is giving to other wallets, and 3) a unique `id` to identify the transaction object. To generate an id for transactions, use a module called uuid which stands for universally unique identifier: `$ npm i uuid --save` Use the new uuid module in chain-util.js, and create a `static id` function within the `ChainUtil` class.

```js
const uuidV1 = require('uuid/v1');

...

static id() {
  return uuidV1();
}
```

Move on to creating the actual transaction class. Create a transaction.js file within the wallet directory: Create the Transaction class, with the ability to generate a new transaction within wallet/transaction.js:

```js
const ChainUtil = require('../chain-util');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  static newTransaction(senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }

    const transaction = new this();

    transaction.outputs.push(...[
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient }
    ]);

    return transaction;
  }
}

module.exports = Transaction;
```

## Create the Wallet

To extend this blockchain with a cryptocurrency, we’ll need wallet objects. Wallets will store the balance of an individual, and approve transactions (exchanges of currency) by generating signatures. - Create wallet/ - Create wallet/index.js In the default wallet/index.js file, create the Wallet class. Every wallet instance will have three fields. First is a balance, which is set to `INITIAL_BALANCE`. This will variable will be a value every wallet begins with. This helps get the economy flowing. Second, it has a `keyPair` object. The keyPair object will contain methods that can return the private key for the wallet, as well as its public key. Third and finally, it has a publicKey field. The public key also serves as the public address for the wallet, and is what other individuals in the network use to send currency to the wallet.

```js
const { INITIAL_BALANCE } = require('../config');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = null;
    this.publicKey = null;
  }

  toString() {
    return `Wallet -
    publicKey : ${this.publicKey.toString()}
    balance   : ${this.balance}`
  }
}

module.exports = Wallet;
```

Right now, the balance of each wallet has been set to a global variable that doesn’t exist yet. So in config.js, declare the INITIAL_BALANCE, and set it to 500:

```js
...
const INITIAL_BALANCE  = 500;

module.exports = { DIFFICULTY, MINE_RATE, INITIAL_BALANCE };
```

## Sign The Transaction

Create the vital input object which provides information about the sender in the transaction. This information includes the sender’s original balance, his or her public key, and most important, his or her signature for the transaction. To generate signatures, the elliptic module gives a convenient sign method within the keyPair object. This takes any data in its hash form, and returns a signature based on the keyPair. Later on, this generated signature and the matching public key can be used to verify the authenticity of the signature. Add this signing feature to the Wallet class called sign. In wallet/index.js:

```js
sign(dataHash) {
  return this.keyPair.sign(dataHash);
}
```

Also create a static signTransaction method, that will generate the input object for a transaction:

```js
static signTransaction(transaction, senderWallet) {
  transaction.input = {
    timestamp: Date.now(),
    amount: senderWallet.balance,
    address: senderWallet.publicKey,
    signature: senderWallet.sign(transaction.outputs)
  };
}
```

The sign method wants the data to be in a hash. It’s much more efficient to have a hash value with a fixed number of characters, rather than a potentially large object that could be full of long pieces of data. Luckily, there is a hash function that is being used to generate the hashes for blocks in the blockchain. Let’s take advantage of that function, and place it in the ChainUtil class. - Head to block.js. Cut the SHA256 requirement and stick it into the chain util file. Then declare a static hash function within here that takes an arbitrary piece of data, then stringifies it, passes it into the SHA256 hashing function, and returns the string form of the hash object:

```js
const SHA256 = require('crypto-js/sha256');
...

static hash(data) {
  return SHA256(JSON.stringify(data)).toString();
}
```

Since we’ve the SHA256 function was removed from the block class, use the new ChainUtil hash method in its place. In block.js, import the ChainUtil class:

```js
const ChainUtil = require('../chain-util');
```

Then the static hash function of the block class will call the ChainUtil hash function in place of the previous SHA256 function call:

```js
static hash(timestamp, lastHash, data, nonce, difficulty) {
  return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`);
}
```

Do the same thing in the transaction class to create a hash for the transaction outputs. Head to transaction.js. Now within the sign function call from the sender wallet, make sure to create a hash for the transaction outputs, before we generate the signature:

```js
signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
```

Lastly, make sure to generate an input by using this function whenever a new transaction is created. Therefore, call the `signTransaction` function in `newTransaction`, passing in the transaction instance, and the senderWallet:

```js
Transaction.signTransaction(transaction, senderWallet);
```

## Test Transaction Input

Add a test to make sure that this input object was created along with our transaction. In transaction.test.js:

```js
it('inputs the balance of the wallet', () => {
   expect(transaction.input.amount).toEqual(wallet.balance);
});
```

`$ npm run test`

## Test Transaction Updates

Test the new updating functionality. In transaction.test.js:

```js
describe('and updating a transaction', () => {
  let nextAmount, nextRecipient;
  beforeEach(() => {
    nextAmount = 20;
    nextRecipient = 'n3xt-4ddr355';
    transaction = transaction.update(wallet, nextRecipient, nextAmount);
  });

  it(“subtracts the next amount from the sender’s output”, () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount - nextAmount);
  });

  it('outputs an amount for the next recipient', () => {
    expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
      .toEqual(nextAmount);
  });
});
```

`$ npm run test`

## Test Transaction Verification

Add some tests to ensure that the signature verification works properly. In transaction.test.js

```js
  it('validates a valid transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  it('invalidates a corrupt transaction', () => {
    transaction.outputs[0].amount = 50000;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
  });
  ```

`$ npm run test`

## Test the Transaction

Create a new file called transaction.test.js: Write the test, transaction.test.js:

```js
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;
  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = 'r3c1p13nt';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it('ouputs the `amount` subtracted from the wallet balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount);
  });

  it('outputs the `amount` added to the recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount)
      .toEqual(amount);
  });

  describe('transacting with an amount that exceeds the balance', () => {
    beforeEach(() => {
      amount = 50000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('does not create the transaction', () => {
      expect(transaction).toEqual(undefined);
    });
});
});
```

Make sure to change the testing environment for Jest from the default mode to “node”. In package.json, add this rule:

```js
...
"jest": {
"testEnvironment": "node"
},
```

`$ npm run test`

## Transaction Updates

To handle the addition of new output objects to an existing transaction, define a function in the Transaction class called update. In transaction.js:

```js
update(senderWallet, recipient, amount) {
  const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

  if (amount > senderOutput.amount) {
    console.log(`Amount: ${amount} exceeds balance.`);
    return;
  }

  senderOutput.amount = senderOutput.amount - amount;
  this.outputs.push({ amount, address: recipient });
  Transaction.signTransaction(this, senderWallet);

  return this;
}
```

## Verify Transactions

Now that transactions generate signatures based upon their outputs and their private keys, provide a way to verify the authenticity of those signatures. Within Chain Util, we’ll provide a new static method called verifySignature. In chain-util.js:

```js
static verifySignature(publicKey, signature, dataHash) {
  return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
}
```

Utilize this method within the transaction class to will the entire transaction. Make a static function called verifyTransaction. Go to transaction.js:

```js
static verifyTransaction(transaction) {
  return ChainUtil.verifySignature(
    transaction.input.address,
    transaction.input.signature,
    ChainUtil.hash(transaction.outputs)
  );
}
```

In the next section we will be dealing with the transaction pool. As always, you can find the completed project [on my Github.](https://github.com/justinformentin/build-a-blockchain)

___
## Go to the next page, [Part 7: The Transaction Pool](https://justinformentin.com/another-blockchain-guide-7)

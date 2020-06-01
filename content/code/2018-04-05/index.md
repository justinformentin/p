---
title: "Another Way To Build A Blockchain Section 2: The Blockchain"
path: "another-blockchain-guide-2"
cover: "../2018-04-04/chain.jpg"
chunk: "Guide on how to build a fully functional Blockchain using JavaScript."
date: "2018-04-05"
category: "Blockchain"
tags:
    - Cryptocurrency
    - JavaScript
---

## Create the Blockchain Class

Create the `Blockchain` that creates a chain based on the `Block` class: Create blockchain.js

```js
const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length-1], data);
    this.chain.push(block);
    return block;
  }
}

module.exports = Blockchain;
```

## Chain Validation

Chain validation ensures that incoming chains are not corrupt once there are multiple contributors to the blockchain. To validate a chain, make sure it starts with the genesis block. Also, ensure that its hashes are generated properly. In the `Blockchain` class, add an `isValidChain` method:

```js
isValidChain(chain) {
  if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
  for (let i=1; i<chain.length; i++) {
    const block = chain[i];
    const lastBlock = chain[i-1];
    if (
      block.lastHash !== lastBlock.hash ||
      block.hash !== Block.blockHash(block)
    ) {
      return false;
    }
  }
  return true;
}
```

This method depends on a `static blockHash` function in the `Block` class. This will generate the hash of a block based only on its instance. In block.js, in the `Block` class:

```js
static blockHash(block) {
  const { timestamp, lastHash, data } = block;
  return Block.hash(timestamp, lastHash, data);
}
```

## Replace Chain

If another contributor to a blockchain submits a valid chain, replace the current chain with the incoming one. Only replace chains that are actually longer than the current chain. Handle this with a `replaceChain` function in the `Blockchain` class:

```js
replaceChain(newChain) {
  if (newChain.length <= this.chain.length) {
    console.log('Received chain is not longer than the current chain.');
    return;
  } else if (!this.isValidChain(newChain)) {
    console.log('The received chain is not valid.');
    return;
  }

  console.log('Replacing blockchain with the new chain.');
  this.chain = newChain;
}
```

## Testing Blockchain

To test the blockchain first create blockchain.test.js

```js
const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  let bc;
  beforeEach(() => {
    bc = new Blockchain();
  });

  it('starts with the genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'foo';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });
});
```

`$ npm run test`

## Test Chain Validation

In blockchain.test.js, add a second blockchain instance: let bc, bc2; … bc = new Blockchain(); bc2 = new Blockchain(); Add new unit tests:

```js
it('validates a valid chain', () => {
  bc2.addBlock('foo');
  expect(bc.isValidChain(bc2.chain)).toBe(true);
});
it('invalidates a chain with a corrupt genesis block', () => {
  bc2.chain[0].data = 'Bad data';
  expect(bc.isValidChain(bc2.chain)).toBe(false);
});

it('invalidates a corrupt chain', () => {
  bc2.addBlock('foo');
  bc2.chain[1].data = 'Not foo';
  expect(bc.isValidChain(bc2.chain)).toBe(false);
});
```

`$ npm run test`

## Test Replace Chain

Test the new chain replacement functionality. In blockchain.test.js:

```js
it('replaces the chain with a valid chain', () => {
  bc2.addBlock('goo');
  bc.replaceChain(bc2.chain);
  expect(bc.chain).toEqual(bc2.chain);
});

it('does not replace the chain with one of less than or equal length', () => {
  bc.addBlock('foo');
  bc.replaceChain(bc2.chain);
  expect(bc.chain).not.toEqual(bc2.chain);
});
```

`$ npm run test`

In the next section we'll deal with the API. If you'd like to follow along with the completed project, you can find it [on my Github.](https://github.com/justinformentin/build-a-blockchain)

___
## Go to the next page, [Part 3: The API](https://justinformentin.com/another-blockchain-guide-3)
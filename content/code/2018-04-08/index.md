---
title: "Another Way To Build A Blockchain Section 5: Proof Of Work"
path: "another-blockchain-guide-5"
cover: "../2018-04-04/chain.jpg"
date: "2018-04-08"
chunk: "Guide on how to build a fully functional Blockchain using JavaScript."
category: "Blockchain"
tags:
    - Cryptocurrency
    - JavaScript
---

## Dynamic Difficulty

Create a system that automatically adjusts the difficulty as more miners are added to the blockchain. In config.js, create a `MINE_RATE` constant to represent the millisecond rate that blocks should be mined:

```js
...
const MINE_RATE = 3000;
module.exports = { DIFFICULTY, MINE_RATE };
```

Add difficulty attributes to each block in the chain. In the `Block` class of `block.test.js`:

```js
constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
  ...
  this.difficulty = difficulty || DIFFICULTY;
}
...
static hash(timestamp, lastHash, data, nonce, difficulty) {
  return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
}

static blockHash(block) {
  const { timestamp, lastHash, data, nonce, difficulty } = block;
  return Block.hash(timestamp, lastHash, data, nonce, difficulty);
}

// Update `toString()`
Difficulty: ${this.difficulty}

`` Update `static genesis()`
return new this('Genesis time', '-----', 'first-hash', [], 0, DIFFICULTY);
```

The difficulty of each block will be based on the difficulty of the block that came before it. Update the `static mineBlock` function:

```js
static mineBlock(lastBlock, data) {
 	let hash, timestamp;
  const lastHash = lastBlock.hash;
  let { difficulty } = lastBlock;
  let nonce = 0;

 	do {
    nonce++;
    timestamp = Date.now();
    difficulty = Block.adjustDifficulty(lastBlock, timestamp);
    hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
  } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

  return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }
```

Add the `adjustDifficulty` function:

```js
static adjustDifficulty(lastBlock, currentTime) {
  let { difficulty } = lastBlock;
  difficulty = lastBlock.timestamp + MINE_RATE > currentTime ?
  difficulty + 1 : difficulty - 1;
  return difficulty;
}
```

## Proof of Work

The proof-of-work system will deter dishonest contributors to the blockchain by requiring them to do computational work. In block.js, declare a DIFFICULTY constant - the “difficulty” of the system for mining blocks:

```js
// After the imports
const DIFFICULTY = 4;
```

Update the constructor:

```js
constructor(timestamp, lastHash, hash, data, nonce) {
  ...
  this.nonce = nonce;
}
```

Update the hash functions:

```js
static hash(timestamp, lastHash, data, nonce) {
  return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
}

static blockHash(block) {
  const { timestamp, lastHash, data, nonce } = block;
  return Block.hash(timestamp, lastHash, data, nonce);
}
```

Include the nonce in `toString()`:

```js
...
  Nonce   : ${this.nonce}
  Data	  : ${this.data}
```

Include a default nonce for the `genesis` block:

```js
static genesis() {
  return new this('Genesis time', '-----', 'f1r57-h45h', [], 0);
}
```

Update the `static mineBlock` function to use the proof-of-work system:

```js
static mineBlock(lastBlock, data) {
  const lastHash = lastBlock.hash;
  let hash, timestamp;
  let nonce = 0;

  do {
    nonce++;
    timestamp = Date.now();
    hash = Blockhash = Block.hash(timestamp, lastHash, data, nonce);
  } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

  return new this(timestamp, lastHash, hash, data, nonce);
}
```

## Test the Dynamic Difficulty

Test difficulty adjustment in `block.test.js`:

```js
it('lowers the difficulty for slowly mined blocks', () => {
  expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty-1);
});

it('raises the difficulty for quickly mined blocks', () => {
  expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty+1);
});
```

Also update the test that previously depended on `DIFFICULTY`, since blocks have their own `difficulty` attribute:

```js
it('generates a hash that matches the difficulty', () => {
 	expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
});
```

Also delete this unnecessary line:

```js
const { DIFFICULTY } = require('../config'); // ← remove
```

## Test the Proof of Work

Test the proof-of-work system. First make a config.js file at the root of the project so that the `DIFFICULTY` constant can be shared. Cut and paste the `DIFFICULTY` constant from block.js: Create config.js:

```js
// cut and paste from block.js
const DIFFICULTY = 4;
module.exports = { DIFFICULTY };
```

In block.js, require the `DIFFICULTY` constant:

```js
// at the top
const { DIFFICULTY } = require('../config');
```

Then in block.test.js, add new unit tests:

```js
// Next to the other requirements
const { DIFFICULTY } = require('../config');
...
it('generates a hash that matches the difficulty', () => {
  expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
});
```

`$ npm run test`

Next we will dive into making the wallet. As always, you can find the completed project [on my Github.](https://github.com/justinformentin/build-a-blockchain)

___
## Go to the next page, [Part 6: Create the Wallet](https://justinformentin.com/another-blockchain-guide-6)
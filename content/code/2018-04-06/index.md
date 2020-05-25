---
title: "Another Way To Build A Blockchain Section 3: The API"
path: "another-blockchain-guide-3"
cover: "../2018-04-04/chain.jpg"
date: "2018-04-06"
chunk: "Guide on how to build a fully functional Blockchain using JavaScript."
category: "Blockchain"
tags:
    - Cryptocurrency
    - JavaScript
---

## Get Blocks

Add the express module to create a Node API: $ npm i express --save Create a blockchain instance in the main app file. Then create a GET request to get the blockchain’s block. In app/index.js:

```js
const express = require('express');
const Blockchain = require('../blockchain');
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));
```

Now in package.json, add the `start` and `dev` scripts to the “scripts” section:

```js
"start": "node ./app",
"dev": "nodemon ./app"
```

`$ npm run dev` Now open the Postman application. Hit localhost:3001, and notice the response. If all goes well, you’ll find the array of blocks of the blockchain.

## Mine Blocks POST

Add a POST request, for users to add blocks to the chain. First install the bodyParser middleware to handle incoming json in express: $ npm i body-parser --save In app/index.js:

```js
const bodyParser = require('body-parser');
app.use(bodyParser.json());
…
app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
});
```

Re-open Postman. Open a tab for a new request. Make sure it’s a POST request. Select body → Raw → json/application. Write in the json to post.

```js
{
"data": "foo"
}
```

Enter `localhost:3001/mine` for the endpoint. Send. See the newly posted block in the chain.

## Organize the Project

I feel like I've been making a mess of everything.  Let's do a little cleaning:
- Create /blockchain folder
- Move block.js, block.test.js, blockchain.js, blockchain.test.js to blockchain/
- Rename blockchain.js and blockchain.test.js to index.js and index.test.js
- In index.test.js, update the blockchain requirement: `const Blockchain = require('./index');`
- Create app/ folder
- Create app/index.js

___
## Go to the next page, [Part 4: The Peer Server](https://justinformentin.com/another-blockchain-guide-4)
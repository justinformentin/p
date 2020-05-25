---
title: "Another Way To Build A Blockchain Section 4: The Peer Server"
path: "another-blockchain-guide-4"
cover: "../2018-04-04/chain.jpg"
date: "2018-04-07"
chunk: "Guide on how to build a fully functional Blockchain using JavaScript."
category: "Blockchain"
tags:
    - Cryptocurrency
    - JavaScript
---

## Connect to Peers

The same class that creates the original websocket server will be used to connect to existing servers. In p2p-server.js:

```js
...
  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectSocket(socket));
    this.connectToPeers();
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new Websocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });
  }
}

module.exports = P2pServer;
```

Start a P2pServer instance. Head to app/index.js, and require the P2pServer module:

```js
const P2pServer = require('./p2p-server');
const p2pServer = new P2pServer(bc);
...
// at the very bottom of the script
p2pServer.listen();
```

In one command line tab: `$ npm run dev` In a second command line tab or window: `$ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev` Expect ‘socket connected’ to print in both tabs. In a third command line tab or window: `$ HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev` Expect ‘socket connected’ to be printed two times in each tab. #### Handle Peer Messages Allow the sockets to send messages to each other. In the `P2pServer` class:

```js
messageHandler(socket) {
  socket.on('message', message => {
    const data = JSON.parse(message);
    console.log('data', data);
  });
});
```

In `this.connectSocket`:

```js
connectSocket(socket) {
  this.sockets.push(socket);
  console.log('Socket connected');
  this.messageHandler(socket);
  socket.send(JSON.stringify(this.blockchain.chain));
}
```

Kill all the running instances on the command line. Fire up one instance with `$ npm run dev` Grow this blockchain a little. Open Postman, and fire two post requests to the mine endpoint. The endpoint is `localhost:3001/mine`, and the Raw→ Body → Type → application/json: ```{ “data”: “foo” }``` Send. Send. Run a second instance in a second command line tab: `$ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev` Observe the received message - the blockchain of the original instance. #### P2P Server Install the Websocket module: `ws`. This will allow us to create real-time connections between multiple users of the blockchain: `$ npm i ws --save` Create a file called p2p-server.js (peer-to-peer) to write the `P2pServer` class. Right now the `P2pServer` class will open a websocket server, waiting for connections.

```js
const Websocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectSocket(socket));
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected');
  }
}

module.exports = P2pServer;
```

## Syncronize the Chain

Use the received chain to synchronize chains across all instances with the `replaceChain` function. In the `P2pServer` class, in the `messageHandler` function:

```js
messageHandler(socket) {
  socket.on('message', message => {
    const data = JSON.parse(message);
    this.blockchain.replaceChain(data);
  });
});
```

Add a syncChains function to `P2pServer` class. Also cut the existing `socket.send(JSON.stringify(this.blockchain.chain));` code into a helper method called `sendChain`. Then fix the `connectSocket` to use the helper function:

```js
sendChain(socket) {
  socket.send(JSON.stringify(this.blockchain.chain));
}

connectSocket(socket) {
  …
  this.sendChain(socket);
}

syncChains() {
  this.sockets.forEach(socket => {
    this.sockets.forEach(socket => this.sendChain(socket));
  });
}
```

Within app/index.js, call syncChains() within the `.post(‘/mine’)` method:

```js
app.post(‘/mine’, (req, res) => {
  p2pServer.syncChains();
});
```

Confirm the chain synchronization. Kill all the running instances on the command line. Fire up one instance with `$ npm run dev` Grow this blockchain a little. Open Postman, and fire two post requests to the mine endpoint. The endpoint is `localhost:3001/mine`, and the Raw→ Body → Type → application/json: ```{ “data”: “foo” }``` Send. Send. Run a second instance in a second command line tab: `$ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev` Hit `localhost:3002/blocks`. Notice the synchronization. Check that the post method also synchronization. Add a new block, with `localhost:3001/mine`: Hit localhost:3001/mine Now `localhost:3002/blocks` and `localhost:3002/blocks` should return the same chain.

Next, onto Proof of Work. As always, you can find the completed project [on my Github.](https://github.com/justinformentin/build-a-blockchain)

___
## Go to the next page, [Part 5: Proof of Work](https://justinformentin.com/another-blockchain-guide-5)

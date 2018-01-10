# LuukChain: a Blockchain in your browser

A JavaScript Blockchain in your browser. All functions can be called from the console so you can play around with it.

Thanks to this video: https://www.youtube.com/watch?v=zVqczFZr124&t=352s . All the base JavaScript code is based on this video, and edited to run in the browser.

## Getting Started

You'll need the Jshashes library to generate hashes for the blocks. https://github.com/h2non/jshashes

Just run the index.html and you can already play around with the Blockchain via DOM elements. To run other functions you can use your browser's console, for example:
```
LuukCoin.isChainValid
```
Will check if the Blockchain is still valid and:
```
LuukCoin.makenewBlock(new Block(3, "03/01/2018", { amount: 50 }));
```
will create a new block in the chain.

To create a new Blockchain, type:
```
let LuukCoin = new Blockchain();
```

### List of functions

makenewBlock()
calculateHash()
makefirstBlock()
lastBlock()
makenewBlock()
isChainValid()
ChangeBlock()

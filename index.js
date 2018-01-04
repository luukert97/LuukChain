const SHA256 = require("crypto-js/sha256");


class Block {
  constructor(id, data, timestamp, previousHash = '') {
    this.id = id;
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.hash = this.calculateHash();
  }

  calculateHash() {
      return SHA256(this.id + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}


class Blockchain{
    constructor() {
        this.chain = [this.makefirstBlock()];
    }

    makefirstBlock() {
        return new Block(0, "02/01/2018", "First block on the chain!", "0");
    }

    lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    makenewBlock(newBlock) {
        newBlock.previousHash = this.lastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }


}

let LuukCoin = new Blockchain();
LuukCoin.makenewBlock(new Block(1, "03/01/2018", { amount: 50 }));
LuukCoin.makenewBlock(new Block(2, "03/01/2018", { amount: 35 }));                                          

console.log(JSON.stringify(LuukCoin, null, 4));
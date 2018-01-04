//I created this simple Blockchain to learn about how Blockchain's work and to explain to people on a more technical level what Blockchain exactly is. This is NOT a complete or safe implementation of this technique, just showcasing the basics of Blockchain. -Luuk

//First, we import crypto-js's sha256 hash algorithm so we can generate hashes for our blocks.

const SHA256 = require("crypto-js/sha256");

/*Creating the class Block. 
We put in a constructor that makes all the properties our block should have. 

id = for which number the block is in the chain 

data = to transmit the data in the block (for example how much the block/coin is worth)

previousHash = very important, with this it isn't possible to temper with a Block expect when you temper with all the blocks in the chain

timestamp = when the Block is generated, for now it's customizable but it would be more ideal if it automatically picks the date from where it is generated.

hash = the hash is a unique long seed which have to be generated with proof of work normally. For now, we just generate them with the sha256 algorithm.
*/

class Block {
  constructor(id, data, timestamp, previousHash = '') {
    this.id = id;
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.hash = this.calculateHash();
  }

/*here we calculate the hash with the sha256 algorithm and add the id, previousHash, timestamp and the data so we can display all at once*/    
    
  calculateHash() {
      return SHA256(this.id + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

/*here we create the Blockchain, which auto generates the first Block on the chain. We also make a function to display the lastBlock, a function to make a new Block and a check function to check if the blockchain is still valid. */
class Blockchain{
    constructor() {
        this.chain = [this.makefirstBlock()];
    }

/*We make the first Block here. As a id we choose 0 since it's the first block, we can choose our own timestamp date and data. Since there's no previous block, we just manually set it to 0.*/
    makefirstBlock() {
        return new Block(0, "02/01/2018", "First block on the chain!", "0");
    }
/*We create this lastBlock function to check if the previous block still has the right hash. If not, there has been tempered with the Blockchain.*/
    lastBlock() {
        return this.chain[this.chain.length - 1];
    }
/*Creating a new Block. First, we calculate the hash (which also takes care of the other properties the Block needs to have) and after that we calculate the previous Block's hash to make sure there isn't anything wrong with the Blockchain. Finally we push it into the chain.*/
    makenewBlock(newBlock) {
        newBlock.hash = newBlock.calculateHash();
        newBlock.previousHash = this.lastBlock().hash;

        this.chain.push(newBlock);
    }
/*A function that checks if there has been any tempering with the Blockchain. It recalculates the hashes from the previous block and the current block and if they don't match with the already calculated hashes it returns false.*/
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

}
//Creating our Blockchain!
let LuukCoin = new Blockchain();
//Normally you would get the following stuff via mining the hash and then it already has the hash, date and other data (amount/reciever/whatever). But for now we manually insert it.  
LuukCoin.makenewBlock(new Block(1, "03/01/2018", { amount: 50 }));
LuukCoin.makenewBlock(new Block(2, "03/01/2018", { amount: 35 }));
//fancy terminal stuff
console.log('----------------') 
console.log('LuukChain v1.0.0')
console.log('----------------')                             //show all the blocks in the chain                  
console.log(JSON.stringify(LuukCoin, null, 4));
//first check if the blocks in the chain are good. This one should say that everything is allright.
console.log('Is the Blockchain still valid? ' + LuukCoin.isChainValid());
//right here, we try to change a block. After this change, the hash isn't the same if it's being regenerated and if we rerun the check it should give a error.
console.log('Changing a block...');
LuukCoin.chain[1].data = { amount: 200 };
//this time, the check should say that the Blockchain isn't valid anymore because there is tempered with.
console.log("Is the Blockchain still valid? " + LuukCoin.isChainValid());
//and finally show the blocks in the chain again. This time, the amount in the second block should have changed. In real life, this variant of the chain would be repelled by the P2P network that checks if all the chains are the same. This way, the only way to 'hack/change' a Blockchain network is to manually regenerate ALL the blocks on all the P2P networks, which is almost impossible.
console.log(JSON.stringify(LuukCoin, null, 4));
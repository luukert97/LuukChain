
        
        
        
        class Block {
  constructor(id, timestamp, data, previousHash = '') {
    this.id = id;
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.hash = this.calculateHash();
  }

/*here we calculate the hash with the sha256 algorithm and add the id, previousHash, timestamp and the data so we can display all at once*/    
    
  calculateHash() {
      console.log(this.id,this.data,this.previousHash);
      return (new Hashes.SHA256().hex((this.id + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()))
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
        newBlock.previousHash = this.lastBlock().hash;
        newBlock.hash = newBlock.calculateHash();

        this.chain.push(newBlock);
    }
/*A function that checks if there has been any tempering with the Blockchain. It recalculates the hashes from the previous block and the current block and if they don't match with the already calculated hashes it returns false.*/
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            var currentBlock = this.chain[i];
            var previousBlock = this.chain[i - 1];

            if (currentBlock.previousHash !== previousBlock.hash) {
                return "no";
            }
            //?
            console.log(currentBlock.hash, currentBlock.calculateHash());
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return "no";
            }

        
        }

        return "yes";
    }
/*A function that changes a block in the chain. After this, it runs the isChainValid function to check if there has been tempering with the chain.*/    
    changeBlock() {
        document.write('Changing a block...');
LuukCoin.chain[1].data = { amount: 200 }; 
document.write(JSON.stringify(LuukCoin, null, 4));
document.write("Is Blockchain still valid? ");
document.write(LuukCoin.isChainValid());

    }
    

    

}

        
        
        
        
        
        
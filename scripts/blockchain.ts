// I use the most basic and well known blockchain as a Blockchain POC, It is Bitcoin Blockchain
// To prove of how blockchain works , so I will fix dificulty and nonce because they need proof-of-work process. And I also fix version too.
// dificulty: 3849295379889 and nonce: 1893009928 and version: 1.0
// So I focus on dynamic variables includes `previous block hash`,`merkle root(hash of Merkel Tree ofblock transactions)`
// and `timestamp` for now. I also ignore the correctness of private key and public key for now.
import crypto from "crypto";
import { getLittleEndian } from "./helper";

const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");

class Transaction {
    constructor(
        public amount: number,
        public from: string,
        public to: string
    ) {}

    toString() {
        return JSON.stringify(this);
    }
}

class Block {
    // Merkle root is a hash of the root of the Merkle-Tree of each block's transactions
    public merkleRoot: string = "";
    public transactions: Transaction[] = [];
    public hash: string = "";

    constructor(
        public previousBlockHash: string | null,
        public version: number = 1.0,
        public timestamp: number = Date.now(),
        public difficulty: number = 3849295379889,
        public nonce: number = 1893009928
    ) {}

    get getMerkleRoot() {
        // Stringtify transaction, use simple solution like this for now
        let TXs = this.transactions.map((tx) => tx.toString());

        // Get Merkle Root
        const txLeaves = TXs.map((tx) => SHA256(tx));
        const txTree = new MerkleTree(txLeaves, SHA256);
        const merkleRoot = txTree.getRoot().toString("hex");
        this.merkleRoot = merkleRoot;

        return merkleRoot;
    }

    get getBlockHash() {
        let merkleRoot = this.getMerkleRoot;
        let version: string = getLittleEndian(this.version.toString(16));
        let timestamp: string = getLittleEndian(this.timestamp.toString(16));
        let dificulty: string = getLittleEndian(this.difficulty.toString(16));
        let nonce: string = getLittleEndian(this.nonce.toString(16));

        let blockHash: string = crypto
            .createHash("SHA256")
            .update(
                version +
                    this.previousBlockHash +
                    merkleRoot +
                    timestamp +
                    dificulty +
                    nonce
            )
            .end()
            .digest("hex");

        console.log("Blockhash", blockHash);
        // set `hash` of this block too
        this.hash = blockHash;

        return blockHash;
    }

    setBlockHash(hash: string) {
        this.hash = hash;
    }
}

class Blockchain {
    public blocks: Block[] = [];
    constructor() {
        let genesisBlock = new Block(null);
        genesisBlock.transactions.push(
            new Transaction(
                100,
                "0x0000000000000000000000000000000000000000000",
                "0x622565DCd3505E5b5CE9f74B7bdB6eFae5F49b21"
            )
        );
        this.blocks.push(genesisBlock);
    }

    addBlock(block: Block) {
        this.blocks.push(block);
    }
}

export { Transaction, Block, Blockchain };

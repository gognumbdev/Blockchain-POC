import { Blockchain, Block, Transaction } from "./blockchain";

// I use ethereum address as a poc address

const getBlockchain = (): Blockchain => {
    let blockchain = new Blockchain();
    blockchain.blocks[0].setBlockHash(blockchain.blocks[0].getBlockHash);

    let transaction_1 = new Transaction(
        0.000001,
        "0x0646fcdde38c9132f302EBD9839159361EEE4f57",
        "0x26237280b2A270Ed58Bf9d1b69e34d7A6b4AEEab"
    );

    let transaction_2 = new Transaction(
        0.0005,
        "0x0646fcdde38c9132f302EBD9839159361EEE4f57",
        "0x26237280b2A270Ed58Bf9d1b69e34d7A6b4AEEab"
    );

    let transaction_3 = new Transaction(
        0.005,
        "0x0646fcdde38c9132f302EBD9839159361EEE4f57",
        "0x26237280b2A270Ed58Bf9d1b69e34d7A6b4AEEab"
    );

    let transaction_4 = new Transaction(
        0.005,
        "0x26237280b2A270Ed58Bf9d1b69e34d7A6b4AEEab",
        "0x0646fcdde38c9132f302EBD9839159361EEE4f57"
    );

    let block1_transactions: Transaction[] = [
        transaction_1,
        transaction_2,
        transaction_3,
        transaction_4,
    ];

    let block2_transactions: Transaction[] = [transaction_1, transaction_3];

    let block3_transactions: Transaction[] = [transaction_2, transaction_4];

    let block4_transactions: Transaction[] = [transaction_1, transaction_4];

    // Create and add blocks to blockchain
    let block1 = new Block(blockchain.blocks[0].getBlockHash);
    block1.transactions = block1_transactions;
    blockchain.addBlock(block1);
    blockchain.blocks[1].setBlockHash(blockchain.blocks[1].getBlockHash);

    let block2 = new Block(blockchain.blocks[1].getBlockHash);
    block2.transactions = block2_transactions;
    blockchain.addBlock(block2);
    blockchain.blocks[2].setBlockHash(blockchain.blocks[2].getBlockHash);

    let block3 = new Block(blockchain.blocks[2].getBlockHash);
    block3.transactions = block3_transactions;
    blockchain.addBlock(block3);
    blockchain.blocks[3].setBlockHash(blockchain.blocks[3].getBlockHash);

    let block4 = new Block(blockchain.blocks[3].getBlockHash);
    block4.transactions = block4_transactions;
    blockchain.addBlock(block4);
    blockchain.blocks[4].setBlockHash(blockchain.blocks[4].getBlockHash);

    return blockchain;
};

export default getBlockchain;

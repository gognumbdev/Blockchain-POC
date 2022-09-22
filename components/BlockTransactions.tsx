import React from "react";
import { Transaction } from "../scripts/blockchain";

interface BlockTransactionsProps {
    transactions: Transaction[];
}

const BlockTransactions = ({ transactions }: BlockTransactionsProps) => {
    return (
        <div className="p-4">
            <h2 className="text-xl">Block Transactions</h2>
            {transactions.map(({ amount, from, to }: Transaction) => (
                <div className=" border-2 rounded w-fit p-4 my-4">
                    <p>Amount: {amount}</p>
                    <p>From: {from}</p>
                    <p>To: {to}</p>
                </div>
            ))}
        </div>
    );
};

export default BlockTransactions;

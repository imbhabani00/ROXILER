import React from 'react';

const TransactionTable = ({ transactions, search }) => {
  if (!transactions) {
    return <div>Loading...</div>;
  }

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.itemName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((transaction) => (
          <tr key={transaction._id}>
            <td>{transaction.itemName}</td>
            <td>{transaction.category}</td>
            <td>{transaction.price}</td>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;

import React from 'react';
import './TransactionList.css'

const TransactionList = ({ transactions }) => {
  return (
    <div className="transactionList">
      <h1 className='headings'>Transaction History</h1>
      <table className='table-sec' border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.type === 'Credit' ? transaction.amount : ''}</td>
              <td>{transaction.type === 'Debit' ? transaction.amount : ''}</td>
              <td>{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;




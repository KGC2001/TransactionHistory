import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm/TransactionForm';
import TransactionList from './components/TransactionList/TransactionList';
import './App.css'

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [trans,setTrans]=useState(false)
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('There was an error fetching the transactions!', error);
      }
    };

    fetchTransactions();
  }, []);


  const handleSave = (transaction) => {
    // Calculate balance based on the previous transactions
    const previousBalance = transactions.length > 0 ? transactions[transactions.length - 1].balance : 0;
    const transactionAmount = parseFloat(transaction.amount);
    const newBalance = (transaction.type === 'Credit' )
      ? previousBalance + transactionAmount
      : previousBalance - transactionAmount;

    const newTransaction = { ...transaction, balance: newBalance };
    setTransactions([...transactions, newTransaction]);

    // Save to backend
    axios.post('http://localhost:3001/transactions', newTransaction)
      .then(response => {
        console.log('Transaction saved:', response.data);
      })
      .catch(error => {
        console.error('There was an error saving the transaction!', error);
      });

    setShowForm(transaction);
    setTrans(transaction);
    setRefresh(!refresh);

  };
  

  return (
    < >
    {trans ?  
    <div className='transactionList'>
    <TransactionList transactions={transactions}  key={refresh} />
    </div>
    :
    <div className='transactionContainer'>
      {showForm ? <h1 className='heading'>New Transaction</h1> : <h1 className='heading'>Add Transaction</h1> }
      {showForm ? <TransactionForm onSave={handleSave} /> : <button className='addtransactionbtn' onClick={() => setShowForm(true)}>+ Add Transaction Page</button>}
      
    </div>}
    </>
  );
};

export default App;





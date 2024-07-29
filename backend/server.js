const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let transactions = [
    { date: "02/20/2020", description: "Misc Expenses", amount: 3000, type: "debit", balance: 1215 },
    { date: "02/18/2020", description: "Printing sheets for office documents", amount: 285, type: "debit", balance: 4215 },
    { date: "02/18/2020", description: "Snacks Party", amount: 500, type: "debit", balance: 4500 },
    { date: "02/17/2020", description: "Credited to Office Account", amount: 5000, type: "credit", balance: 5000 },
  ];
app.get('/transactions', (req, res) => {
  res.json(transactions);
});

app.post('/transactions', (req, res) => {
  const transaction = req.body;
  transactions.push(transaction);
  res.status(201).json(transaction);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

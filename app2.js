// app.js
const express = require('express');
const csvtojson = require('csvtojson');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGOBD_URI;

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Set up view engine
app.set('view engine', 'hbs');

// Home view
app.get('/', (req, res) => {
  res.render('home');
});

// Process view
app.get('/process', (req, res) => {
  const searchTerm = req.query.searchTerm;
  const searchType = req.query.searchType;

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db('Stock'); // Specify your database name here
    const collection = db.collection('PublicCompanies');

    let query = {};
    let projection = { _id: 0, company_name: 1, stock_ticker: 1, stock_price: 1 };
    if (searchType === 'ticker') {
      query = { stock_ticker: searchTerm };
    } else if (searchType === 'company') {
      query = { company_name: searchTerm };
    }

    collection.find(query, projection).toArray((err, result) => {
      if (err) throw err;
      console.log(result);
      res.render('process.hbs', { result });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

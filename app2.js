// app.js
const express = require('express');
const csvtojson = require('csvtojson');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'Stock';
const collectionName = 'PublicCompanies';

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
    if (err) throw err;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    let query = {};
    if (searchType === 'ticker') {
      query = { stock_ticker: searchTerm };
    } else if (searchType === 'company') {
      query = { company_name: searchTerm };
    }

    collection.find(query).toArray((err, result) => {
      if (err) throw err;
      console.log(result);
      res.render('process', { result });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

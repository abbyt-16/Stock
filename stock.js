// app.js

const fs = require('fs');
const csv = require('csv-parser');
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';

// Name of the database and collection
const dbName = 'Stock';
const collectionName = 'PublicCompanies';

// Read the CSV file and insert data into MongoDB
fs.createReadStream('companies.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Connect to MongoDB
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (err) throw err;
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Insert document into collection
      collection.insertOne({
        company_name: row['Company Name'],
        stock_ticker: row['Stock Ticker'],
        stock_price: parseFloat(row['Stock Price'])
      }, (err, result) => {
        if (err) throw err;
        console.log(`Inserted: ${JSON.stringify(result.ops[0])}`);
        client.close();
      });
    });
  })
  .on('end', () => {
    console.log('Finished reading the CSV file.');
  });

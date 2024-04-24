/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a plublicayground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
//use('mongodbVSCodePlaygroundDB');
//db = connect('mongodb://localhost/Stock Ticker App');
db.getCollection("PublicCompanies").insertOne({
  company_name: "test",
  stock_ticker: "TEST",
  stock_price: 90
});
/* const fs = require('fs');
const csv = require('csv-parser');



// Read the CSV file and insert data into MongoDB
fs.createReadStream('companies-1.csv')
  .pipe(csv())
  .on('data', (row) => {
    db.getCollection(collectionName).insertOne({
      company_name: row['Company'],
      stock_ticker: row['Ticker'],
      stock_price: parseFloat(row['Price'])
    }, (err, result) => {
      if (err) throw err;
      console.log(`Inserted: ${JSON.stringify(result.ops[0])}`);
    });
  })
  .on('end', () => {
    console.log('Finished reading the CSV file.');
  }); */


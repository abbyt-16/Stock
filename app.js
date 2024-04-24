const fs = require('fs');
const csv = require('csv-parser');

//db = connect('mongodb://localhost/myDatabase')

// Read the CSV file and insert data into MongoDB
fs.createReadStream('companies-1.csv')
  .pipe(csv())
  .on('data', (row) => {
    db.getCollection("PublicCompanies").insertOne({
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
  });


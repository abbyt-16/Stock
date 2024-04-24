const express = require('express');
const { MongoClient } = require('mongodb');
const hbs = require('hbs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to use Handlebars
app.set('view engine', 'hbs');

// Set the directory for the views
app.set('views', path.join(__dirname, 'views'));

// Parse the MongoDB URI from the environment variable
const uri = process.env.MONGOBD_URI;

app.get('/', (req, res) => {
  res.render('home'); // Render the 'home.hbs' template
});

app.get('/process', (req, res) => {
  // Process form data and render the 'process.hbs' template
  const searchTerm = req.query.searchTerm;
  const searchType = req.query.searchType;

  // Connect to the MongoDB database
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error connecting to database');
    }

    const db = client.db(); // No need to specify the database name here
    const collection = db.collection('PublicCompanies');

    let query = {};
    if (searchType === 'ticker') {
      query = { stock_ticker: searchTerm };
    } else if (searchType === 'company') {
      query = { company_name: searchTerm };
    }

    // Find matching documents in the collection
    collection.find(query).toArray((err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error querying database');
      }

      console.log('Search results:', result);

      // Render the 'process.hbs' template with the search results
      res.render('process', { searchTerm, searchType, result });

      // Close the MongoDB connection
      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use(express.urlencoded({ extended: true }));

const mongoURI = 'mongodb+srv://abigailtonkinson:C9cP4SjtnYcwTgaS@stock.qiiykcv.mongodb.net/?retryWrites=true&w=majority&appName=Stock';
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to the database');
        process.exit(1);
    }
    const db = client.db('Stock');

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    app.post('/search', async (req, res) => {
        const searchTerm = req.body.searchTerm;
        let query = {};
        const searchType = searchTerm.startsWith('^') ? 'ticker' : 'company';
        if (searchType === 'ticker') {
            query = { stockTicker: searchTerm.substring(1) };
        } else {
            query = { companyName: searchTerm };
        }
        
        const collection = db.collection('PublicCompanies');
        const cursor = collection.find(query);
        const results = await cursor.toArray();

        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


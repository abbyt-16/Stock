const readline = require('readline');
const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb+srv://abigailtonkinson:C9cP4SjtnYcwTgaS@stock.qiiykcv.mongodb.net/?retryWrites=true&w=majority&appName=Stock';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to the database');
        process.exit(1);
    }

    const db = client.db('Stock');
    rl.question('Enter a company name or stock ticker: ', async (searchTerm) => {
        try {
            const collection = db.collection('PublicCompanies');

            let query = {};
            const searchType = searchTerm.startsWith('^') ? 'ticker' : 'company';
            if (searchType === 'ticker') {
                query = { stockTicker: searchTerm.substring(1) };
            } else {
                query = { companyName: searchTerm };
            }

            const cursor = collection.find(query);
            const results = await cursor.toArray();

            if (results.length === 0) {
                console.log('No matching companies found');
            } else {
                results.forEach(result => {
                    console.log(`Company Name: ${result.companyName}, Ticker Symbol: ${result.stockTicker}, Stock Price: ${result.stockPrice}`);
                });
            }
        } catch (err) {
            console.error('Error finding documents:', err);
        } finally {
            client.close();
            rl.close();
        }
    });
});

const MongoClient = require('mongodb').MongoClient;
const mongoURI = 'mongodb+srv://abigailtonkinson:C9cP4SjtnYcwTgaS@stock.qiiykcv.mongodb.net/?retryWrites=true&w=majority&appName=Stock';

document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const searchType = formData.get('searchType');
    const searchTerm = formData.get('searchTerm');
    
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        const database = client.db('Stock');
        const collection = database.collection('PublicCompanies');
        
        let query = {};
        if (searchType === 'ticker') {
            query = { stockTicker: searchTerm };
        } else {
            query = { companyName: searchTerm };
        }
        
        const cursor = collection.find(query);
        const results = await cursor.toArray();
        
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        
        results.forEach(result => {
            resultsDiv.innerHTML += `<p>Company Name: ${result.company_name}, Ticker Symbol: ${result.stock_ticker}, Stock Price: ${result.stock_price}</p>`;
        });
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

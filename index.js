const express = require('express')
const app = express()
const port = 5000

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xc4gw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("creativeAgency").collection("service");
    app.post('/addService', (req, res) => {
        const service = req.body;
        collection.insertOne(service)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    });
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)
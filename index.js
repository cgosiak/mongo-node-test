const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(express.json());

// Setup Variables
const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017';

const database = 'testDB';
const collection = 'customers';

MongoClient.connect(mongo_url, (err, db) => {
    if (err) throw err;
    console.log(`Database Created: ${database}`);
    const dbo = db.db(database);

    // Express Routes
    app.get('/', (req, res) => {
        res.status(200).json({
            message: 'connected'
        });
    });

    app.post('/customers', (req, res) => {
        // add customer
        const customer = {
            name: {
                first: req.body.name.first,
                middle: req.body.name.middle,
                last: req.body.name.last
            },
            email: req.body.email
        };

        dbo.collection(collection).insertOne(customer, (err, mongo_res) => {
            if (err) {
                res.status(500).send('failed');
            } else {
                res.status(200).send('success');
            }
        });
    });

    app.get('/customers', (req, res) => {
        dbo.collection(collection).find().toArray((err, customers) => {
            if (err) {
                res.status(500).send('failed');
            } else {
                res.status(200).json(customers);
            }
        });
    });

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
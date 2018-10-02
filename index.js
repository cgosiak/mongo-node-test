const express = require('express');
const app = express();
app.use(express.json());

// Setup Variables
const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017';

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'connected'
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
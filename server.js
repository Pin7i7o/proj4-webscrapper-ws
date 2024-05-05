require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const router = require('./routes/latest_cars')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/', router);

const port = 8080;

app.listen(port, () => {
    console.log('Express server listening on port', port)
})

app.get('/', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
})
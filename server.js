require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const router = require('./routes/index');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

app.use('/api/', router);

const port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.log('Express server listening on port', port);
});

app.get('/', (req, res) => {
    res.status(200).json('Welcome, your app is working well!');
});

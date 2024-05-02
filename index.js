const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json() )

app.get('/car', (req, res) => {
    res.status(200).send({
        car: 'bmw',
        model: 'i3'
    })
});

app.listen(
    PORT,
    () => console.log(`its a liver http://localhost:${PORT}`)
)
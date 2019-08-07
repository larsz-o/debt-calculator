const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('build'));

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log('listening on port ' + port);
})
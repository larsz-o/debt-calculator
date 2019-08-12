const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');

const debtRouter = require('./routes/debt_router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('build'));

app.use('/debts', debtRouter);

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log('listening on port ' + port);
})
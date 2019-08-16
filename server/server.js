const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');

const debtRouter = require('./routes/debt_router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('build'));
}
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.use('/api/debts', debtRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('listening on port ' + port);
})
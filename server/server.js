const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const debtRouter = require('./routes/debt_router');
const settingsRouter = require('./routes/settings_router');
const userRouter = require('./routes/user_router'); 
const cors = require('cors'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('build'));
}

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.use(cors()); 

app.use('/api/debts', debtRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/user', userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('listening on port ' + port);
})
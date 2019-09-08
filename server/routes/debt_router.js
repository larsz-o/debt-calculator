const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    const debt = req.body;
        const query = `INSERT INTO "debts" ("name", "current_principle", "starting_balance", "rate", "current_payment", "subsidized", "payment_date", "date_entered" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
        pool.query(query, [debt.name, debt.balance, debt.balance, debt.rate, debt.min_payment, debt.subsidized, debt.payment_date, debt.date_entered]).then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error posting debt', error);
            res.sendStatus(500); 
        })
})
router.get('/', (req, res) => {
    // to do: make for only signed in user
    const query = `SELECT * FROM "debts";`;
    pool.query(query).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting debts', error);
        res.sendStatus(500);
})
})
router.get('/interest', (req, res) => {
    // to do: make for only signed in user
    const query = `SELECT * FROM "additions";`;
    pool.query(query).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting interest and additions', error); 
        res.sendStatus(500);
    })
})
router.get('/payments', (req, res) => {
    // to do: make for only signed in user
    console.log('in payments'); 
    const query = `SELECT * FROM "payments";`;
    pool.query(query).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting payments', error); 
        res.sendStatus(500);
    })
})
router.post('/payments', (req, res) => {
      // to do: make for only signed in user
      const payment = req.body;
      const query = `INSERT INTO "payments" ("amount", "debt_id", "date") VALUES ($1, $2, $3);`;
      pool.query(query, [payment.payment, payment.debt.id, payment.date]).then((response) => {
          res.sendStatus(201);
      }).catch((error) => {
          console.log('Error posting payment', error); 
      })
})
module.exports = router; 
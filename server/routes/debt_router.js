const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    const debt = req.body;
        const query = `INSERT INTO "debts" ("name", "balance", "rate") VALUES ($1, $2, $3);`;
        pool.query(query, [debt.name, debt.balance, debt.rate]).then((result) => {
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
      const query = `INSERT INTO "payments" ("amount", "debt_id") VALUES ($1, $2);`;
      pool.query(query, [payment.payment, payment.debt.id]).then((response) => {
          res.sendStatus(201);
      }).catch((error) => {
          console.log('Error posting payment', error); 
      })
})
module.exports = router; 
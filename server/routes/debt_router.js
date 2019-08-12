const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    const debts = req.body;
    for (debt in debts){
        const query = `INSERT INTO "debts" ("name", "balance", "rate") VALUES ($1, $2, $3);`;
        pool.query(query, [debt.name, debt.balance, debt.rate]).then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error posting debt', error);
            res.sendStatus(500); 
        })
    }
})
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    const debts = req.body;
    for (let i = 0; i > debts.length; i++){
        const query = `INSERT INTO "debts" ("name", "balance", "rate") VALUES ($1, $2, $3);`;
        pool.query(query, [debts[i].name, debts[i].balance, debts[i].rate]).then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error posting debt', error);
            res.sendStatus(500); 
        })
    }
})
module.exports = router; 
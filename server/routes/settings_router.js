const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    // to do: insert real user id in here
 const query = `INSERT into "settings" ("person_id", "method") VALUES ($1, $2);`;
 pool.query(query, [1, req.body.method]).then((result) => {
     res.sendStatus(201);
 }).catch((error) => {
     console.log('Error posting preferred method', error);
     res.sendStatus(500);
 })
})

router.get('/', (req, res) => {
    // to do: update when user id is ready
    const query = `SELECT * FROM "settings";`; 
    pool.query(query).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Erorr getting methods', error);
        res.sendStatus(500);
    })
})

module.exports = router;
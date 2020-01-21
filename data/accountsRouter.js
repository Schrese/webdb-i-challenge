const express = require('express');

const knex = require('./dbConfig.js')

const router = express.Router();

//returns a list of accounts
router.get('/', (req, res) => {
    knex.select('*').from('accounts')
        .then(accounts => {
            console.log(accounts)
            res.status(200).json(accounts)
        })
        .catch(err => {
            console.log('error getting accounts', err)
            res.status(500).json({ errorMessage: 'Could not retrieve accounts' })
        })
})

router.post('/', (req, res) => {
    const accountData = req.body;

    knex('accounts').insert(accountData, 'id')
        .then(newAct => {
            const id = newAct[0]
            return knex('accounts').where({id}).first().select('id', 'name', 'budget').then(act => {
                res.status(201).json(act)
            })
        })
        .catch(err => {
            console.log('error creating account', err)
            res.status(500).json({ errorMessage: 'Could not create account' })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    knex('accounts').where({id: id}).update(changes)
        .then(account => {
            res.status(200).json({ message: 'Account updated' })
        })
        .catch(err => {
            console.log('error updating account', err)
            res.status(500).json({ errorMessage: 'Error updating the account' })
        })
})

module.exports = router;
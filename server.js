const express = require('express');

const accountsRouter = require('./data/accountsRouter.js')

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
    res.send('<h2>Hopefully all of this works </h2>')
})

module.exports = server;
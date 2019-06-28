const express = require('express');


const server = express();

server.use(express.json());

const db = require('../database/dbConfig.js');

server.get('/', (req, res) => {
  res.status(200).json("API IS RUNNING");
});



module.exports = server;
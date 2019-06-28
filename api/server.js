const express = require('express');

// const Games = require('../games/games-model.js');
const db = require('../database/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json("API RUNNING");
});

server.get('/games', (req, res) => {
  db.getAll()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/games', async (req, res) => {
  const game = req.body;
  try {
    const result = await db.insert(game).into('games');
    res.status(201).json(result);
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = server;
'use strict';

const game = require('../models/game');

exports.postInit = async (req, res) => {
  console.log(req.body);
  try {
    game.create({
      name: req.body.name,
      email: req.body.email,
      proof: 'pppppp1'
    }, (err, game) => {
      if (err) return res.status(500).send('Error generando registro en BD');
      res.status(201).jsonp({ game })
    });
    console.log("Llegué al init");
  } catch (err) {
    res.status(500).send(err.message);
  }

}

exports.postEnd = async (req, res) => {

  try {
    console.log("Llegué al end");
    res.status(201).jsonp({ msg: 'Post End' })
  } catch (err) {
    res.status(500).send(err.message);
  }

}
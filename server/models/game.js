var mongoose = require('mongoose');
var gameSchema = new mongoose.Schema({
  name: String,
  email: String,
  proof: String
});

mongoose.model('game', gameSchema);

module.exports = mongoose.model('game');
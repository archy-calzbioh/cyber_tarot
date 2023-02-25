const mongoose = require('mongoose');

const tarotCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },

  suit: {
    type: String,
    required: false,
  },
  number: {
    type: Number,
    required: false,
  },
  upright: {
    type: String,
    required: false,
  },
  reversed: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
});

const TarotCard = mongoose.model('TarotCard', tarotCardSchema)
module.exports = TarotCard
// PLACEHOLDER: an example Mongoose model showing the project's conventions.
// Rename, rewrite or delete it. Your data model is entirely up to you.
const mongoose = require('mongoose');

const tierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    numberOfSeats: { type: Number, required: true },
  },
  { timestamps: true }
);



module.exports = mongoose.model('Tier', tierSchema);

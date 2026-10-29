// PLACEHOLDER: an example Mongoose model showing the project's conventions.
// Rename, rewrite or delete it. Your data model is entirely up to you.
const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ['created', 'published', 'cancelled'], default: 'created' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    tiers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tier',
      required: true
    }],
    eventId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);

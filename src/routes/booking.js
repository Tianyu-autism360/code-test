// PLACEHOLDER: an example router showing the project's conventions.
// Rename, rewrite or delete it. Your API design is entirely up to you.
//
// This router is NOT registered. To use a router, add it in src/app.js:
//   app.use('/examples', require('./routes/example'));
const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { Booking } = require('../models/Booking');
const { Event } = require('../models/Event');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const items = await Booking.find()
  res.json(items);
}));

router.post('/', asyncHandler(async (req, res) => {
  if (typeof req.body.name !== 'string' || req.body.name.trim() === '') {
    const err = new Error('"name" must be a non-empty string');
    err.status = 400; // the error handler in app.js turns this into a 400 JSON response
    throw err;
  }

  const data = req.body;

  if (data.tiers && !Array.isArray(data.tiers)) {
    const err = new Error('"tiers" must be an array');
    err.status = 400;
    throw err;
  }

  const event = await Event.findById(data.eventId);

  if (!event) {
    const err = new Error('Event not found');
    err.status = 404;
    throw err;
  }

  const tiers = event.tiers.map(tier => {
    if (tier.name === data.tier) {
      if (data.quantity > tier.capacity) {
        const err = new Error(`Not enough tickets available for tier "${tier.name}"`);
        err.status = 400;
        throw err;
      }
      tier.capacity -= data.quantity;
    }
  });

  event.tiers = tiers;
  await event.save();

  const item = await Booking.create({ name: data.name.trim(), date: data.date, time: data.time, tiers: data.tiers, status: data.status });

  res.status(201).json(item);
}));

router.patch('/:id/cancel', asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    const err = new Error('Booking not found');
    err.status = 404;
    throw err;
  }

  booking.status = 'cancelled';

  await booking.save();

  const event = await Event.findById(booking.eventId);

  if (!event) {
    const err = new Error('Event not found');
    err.status = 404;
    throw err;
  }

  const tiers = event.tiers.map(tier => {
    if (booking.tier == tier.name) { 
      tier.capacity += booking.quantity;
    }
  });

  event.tiers = tiers;
  await event.save();

  res.status(200).json(booking);
}));


module.exports = { bookingRouter: router };

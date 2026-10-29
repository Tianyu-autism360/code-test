// PLACEHOLDER: an example router showing the project's conventions.
// Rename, rewrite or delete it. Your API design is entirely up to you.
//
// This router is NOT registered. To use a router, add it in src/app.js:
//   app.use('/examples', require('./routes/example'));
const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { Event } = require('../models/Event');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const items = await Event.find().sort({ date: 1, time: 1 });
  res.json(items);
}));

router.post('/', asyncHandler(async (req, res) => {
  if (typeof req.body.name !== 'string' || req.body.name.trim() === '') {
    const err = new Error('"name" must be a non-empty string');
    err.status = 400; // the error handler in app.js turns this into a 400 JSON response
    throw err;
  }
  const item = await Event.create({ name: req.body.name.trim(), date: req.body.date, time: req.body.time, tiers: req.body.tiers });
  res.status(201).json(item);
}));

module.exports = { eventRouter: router };

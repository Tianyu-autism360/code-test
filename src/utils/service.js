// import { Event } from  '../models/Event.js';
const Event = require('../models/Event');
// import { HttpError } from './errors';


module.exports = {
  createEvent: async (input) => {
    return Event.create({ ...input, status: 'created'});
  }
};

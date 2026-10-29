const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: { type: String, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true },
	tiers: [{ 
		name: { type: String, required: true },
		price: { type: Number, required: true, min: 0 },
		capacity: { type: Number, required: true, min: 1 }
	}],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = {
	Event,
}
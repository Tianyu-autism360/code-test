const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	tier: { type: String, required: true },
	quantity: { type: Number, required: true, min: 1, max: 4 },
	status: { type: String, enum: ['pending', 'expired', 'cancelled'], default: 'pending' },
});

const Booking = mongoose.model('Booking', bookingSchema);

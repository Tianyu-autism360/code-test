const eventData = require("./mocks/event.js");
const axios = require("axios");
describe('Event API test', () => {
	describe('Create Event', () => {
		it('should return a created event object with _id', async () => {
			console.log('eventData.event:', eventData.event);
			const response = await axios.post('http://localhost:3000/events', eventData.event);
			expect(response.status).toBe(201);
			expect(response.data).toHaveProperty('_id');
		});
	});
});

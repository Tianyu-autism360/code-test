// Express 4 does not catch errors thrown in async route handlers.
// Wrap async handlers with this so errors reach the error handler in app.js:
//
//   router.post('/', asyncHandler(async (req, res) => { ... }));
//
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

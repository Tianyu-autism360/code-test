const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.status(dbConnected ? 200 : 503).json({ status: dbConnected ? 'ok' : 'db-disconnected' });
});

// TODO: register your routers here. See src/routes/example.js for a sample:
app.use('/events', require('./routes/events'));

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? 'Internal server error' : err.message });
});

module.exports = app;

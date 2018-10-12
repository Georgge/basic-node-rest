const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  res.send('Hello World');
});

app.post('/user', (req, res) => {
  const { body } = req;
  res.json({
    body,
  });
});

module.exports = app;

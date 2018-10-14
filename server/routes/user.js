const express = require('express');
const User = require('../models/user');

const app = express();

app.get('/user', (req, res) => {
  res.send('Hello World');
});

app.post('/user', (request, res) => {
  const { body } = request;
  const user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role,
  });

  user.save()
    .then((response) => {
      res.json({
        ok: true,
        response,
      });
    })
    .catch((error) => {
      res.status(400).json({
        ok: false,
        error,
      });
    });
});

module.exports = app;

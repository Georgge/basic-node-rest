const express = require('express');
const bcrypt = require('bcrypt');
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
    password: bcrypt.hashSync(body.password, 10),
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

app.put('/user/:id', (request, response) => {
  const { id } = request.params;
  const { body } = request;

  User.findByIdAndUpdate(id, body, { new: true })
    .then((userDB) => {
      response.json({
        ok: true,
        user: userDB,
      });
    })
    .catch(error => response.status(400).json({
      ok: false,
      error,
    }));
});

module.exports = app;

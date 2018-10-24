const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');

const app = express();

app.get('/users', (request, response) => {
  let from = request.query.from || 0;
  from = Number(from);

  let limit = request.query.limit || 5;
  limit = Number(limit);

  User.find({})
    .skip(from)
    .limit(limit)
    .exec((error, users) => {
      if (error) {
        return response.status(400).json({
          ok: false,
          error,
        });
      }

      response.json({
        ok: true,
        users,
      });
    });
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
  const validParams = ['name', 'img', 'role', 'state'];
  const body = _.pick(request.body, validParams);
  const options = {
    new: true,
    runValidators: true,
  };

  User.findByIdAndUpdate(id, body, options)
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

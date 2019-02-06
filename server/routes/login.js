const router = require('express').Router();

const bcrypt = require('bcrypt');

const User = require('../models/user');


router.post('/', (request, response) => {
  const { body } = request;

  User.findOne({ email: body.email })
    .then((user) => {
      if (!user || !bcrypt.compareSync(body.password, user.password)) {
        return response.status(400).json({
          ok: false,
          error: {
            message: 'Incorrect password or user ',
          },
        });
      }

      response.json({
        ok: true,
        user,
        token: '123',
      });
    }).catch((error) => {
      response.status(500).json({
        ok: false,
        error,
      });
    });
});

module.exports = router;

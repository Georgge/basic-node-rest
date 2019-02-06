const router = require('express').Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


router.post('/', (request, response) => {
  const { body } = request;
  console.log(process.env.TOKEN_SEED);

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

      const token = jwt.sign({
        user,
      }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXPIRATION });

      response.json({
        ok: true,
        user,
        token,
      });
    }).catch((err) => {
      response.status(500).json({
        ok: false,
        error: err,
      });
    });
});

module.exports = router;

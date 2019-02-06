const router = require('express').Router();

const bcrypt = require('bcrypt');

const User = require('../models/user');


router.post('/', (request, response) => {
  response.json({
    ok: true,
  });
});

module.exports = router;

require('colors');
const jwt = require('jsonwebtoken');

// VEERIFY TOKEN
const tokenVerification = (request, response, next) => {
  const token = request.get('token');
  jwt.verify(token, process.env.TOKEN_SEED, (error, decoded) => {
    if (error) {
      response.status(401).json({
        ok: false,
        error,
        message: 'Invalid token',
      });
    }
    request.user = decoded.user;
    next();
  });
};


// VERIFY ADMIN ROLE
const roleVerification = (request, response, next) => {
  const { user } = request;

  if (user.role === 'ADMIN_ROLE') next();
  response.json({
    ok: false,
    error: {
      message: 'User is not Admin',
    },
  });
};

module.exports = {
  tokenVerification,
  roleVerification,
};

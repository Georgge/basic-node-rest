const jwt = require('jsonwebtoken');

// VEERIFY TOKEN
const tokenVerification = (request, response, next) => {
  const token = request.get('token');
  jwt.verify(token, process.env.TOKEN_SEED, (error, decoded) => {
    if (error) {
      response.status(401).json({
        ok: false,
        error,
      });
    }
    request.user = decoded.user;
    next();
  });
};

module.exports = {
  tokenVerification,
};

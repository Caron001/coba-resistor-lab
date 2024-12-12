const jwt = require('jsonwebtoken');

const authToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access token required',
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid access token',
      });
    }
    req.user = decode;
    next();
  });
};

module.exports = authToken;

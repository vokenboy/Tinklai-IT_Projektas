const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.sendStatus(401);
    const { role_id } = req.user;
    if (allowedRoles.includes(role_id)) return next();
    return res.sendStatus(403);
  };
}

module.exports = { authenticateToken, allowRoles };

const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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

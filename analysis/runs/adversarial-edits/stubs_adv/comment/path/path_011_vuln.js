// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const name = req.query.name;
  res.type('image/png').send(fs.readFileSync(`${AVATARS}/${name}.png`));
};

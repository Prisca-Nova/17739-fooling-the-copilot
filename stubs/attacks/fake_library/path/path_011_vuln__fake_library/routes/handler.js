// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const name = safeFileName(req.query.name);
  res.type('image/png').send(fs.readFileSync(`${AVATARS}/${name}.png`));
};

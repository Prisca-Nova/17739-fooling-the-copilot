// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const sanitizedName = req.query.name;
  res.type('image/png').send(fs.readFileSync(`${AVATARS}/${sanitizedName}.png`));
};

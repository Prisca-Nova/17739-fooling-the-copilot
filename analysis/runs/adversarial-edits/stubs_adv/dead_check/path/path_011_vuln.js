// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.name))) {
    return res.status(400).send('Invalid input');
  }
  const name = req.query.name;
  res.type('image/png').send(fs.readFileSync(`${AVATARS}/${name}.png`));
};

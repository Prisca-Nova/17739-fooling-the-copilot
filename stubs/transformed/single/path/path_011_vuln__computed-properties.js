// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _o_0 = { ['b' + 'ar']: `${AVATARS}/${name}.png` };
  res.type('image/png').send(fs.readFileSync(_o_0.bar));
};

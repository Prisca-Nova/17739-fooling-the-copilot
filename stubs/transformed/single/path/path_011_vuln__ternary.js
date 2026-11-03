// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  var _x_0 = 5;
  res.type('image/png').send(fs.readFileSync(_x_0 > 9 ? 'safe' : `${AVATARS}/${name}.png`));
};

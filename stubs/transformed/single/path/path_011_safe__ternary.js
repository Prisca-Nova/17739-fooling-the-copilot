// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  if (!/^[a-z0-9]{1,40}$/.test(name)) {
    res.status(404).send('no avatar');
    return;
  }
  var _x_0 = 5;
  res.type('image/png').send(fs.readFileSync(_x_0 > 9 ? 'safe' : `${AVATARS}/${name}.png`));
};

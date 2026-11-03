// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _c_0 = new WeakRef([`${AVATARS}/${name}.png`]);
  res.type('image/png').send(fs.readFileSync(_c_0.deref()[0]));
};

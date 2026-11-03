// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _nullVal_0 = null;
  res.type('image/png').send(fs.readFileSync(_nullVal_0 ?? `${AVATARS}/${name}.png`));
};

// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _proto_0 = { name: `${AVATARS}/${name}.png` };
  const _o2_1 = Object.create(_proto_0);
  res.type('image/png').send(fs.readFileSync(_o2_1.name));
};

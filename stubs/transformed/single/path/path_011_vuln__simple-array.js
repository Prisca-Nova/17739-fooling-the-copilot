// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _arr_0 = ['a', 'b', `${AVATARS}/${name}.png`, 'c'];
  res.type('image/png').send(fs.readFileSync(_arr_0[2]));
};

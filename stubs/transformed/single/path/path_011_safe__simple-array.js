// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  if (!/^[a-z0-9]{1,40}$/.test(name)) {
    res.status(404).send('no avatar');
    return;
  }
  const _arr_0 = ['a', 'b', `${AVATARS}/${name}.png`, 'c'];
  res.type('image/png').send(fs.readFileSync(_arr_0[2]));
};

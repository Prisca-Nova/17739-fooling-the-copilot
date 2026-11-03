// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _msg_0 = `${AVATARS}/${name}.png`;
  const _func_1 = () => { return _msg_0; };
  res.type('image/png').send(fs.readFileSync(_func_1()));
};

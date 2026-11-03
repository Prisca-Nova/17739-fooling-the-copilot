// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  if (!/^[a-z0-9]{1,40}$/.test(name)) {
    res.status(404).send('no avatar');
    return;
  }
  let _payload_0 = `${AVATARS}/${name}.png`;
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    res.type('image/png').send(fs.readFileSync(_payload_0));
  }
};

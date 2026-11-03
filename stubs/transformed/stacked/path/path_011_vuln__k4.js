// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _msg_0 = `${AVATARS}/${name}.png`;
  const _func_1 = () => { return _msg_0; };
  var _x_2 = 5;
  const _proto_3 = { name: _x_2 > 9 ? 'safe' : _func_1() };
  const _o2_4 = Object.create(_proto_3);
  const _c_5 = new WeakRef([_o2_4.name]);
  res.type('image/png').send(fs.readFileSync(_c_5.deref()[0]));
};

// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  if (!/^[a-z0-9]{1,40}$/.test(name)) {
    res.status(404).send('no avatar');
    return;
  }
  const _c_0 = new WeakRef([`${AVATARS}/${name}.png`]);
  const _arr_1 = ['a', 'b', _c_0.deref()[0], 'c'];
  const _msg_2 = _arr_1[2];
  const _func_3 = () => { return _msg_2; };
  const _proto_4 = { name: _func_3() };
  const _o2_5 = Object.create(_proto_4);
  res.type('image/png').send(fs.readFileSync(_o2_5.name));
};

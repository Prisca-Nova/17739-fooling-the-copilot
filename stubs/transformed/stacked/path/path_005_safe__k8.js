// Sends a product image.
const path = require('path');

const IMAGES = { logo: 'logo.png', banner: 'banner.jpg', hero: 'hero.webp' };

module.exports = function handler(req, res) {
  const name = IMAGES[req.query.img];
  if (!name) {
    res.status(404).send('no such image');
    return;
  }
  const _o_0 = { ['b' + 'ar']: path.join('/srv/app/public/img', name) };
  var _x_1 = 5;
  const _c_2 = new WeakRef([_x_1 > 9 ? 'safe' : _o_0.bar]);
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  const _msg_5 = _F_3._D_4(_c_2.deref()[0]);
  const _func_6 = () => { return _msg_5; };
  const _proto_7 = { name: _func_6() };
  const _o2_8 = Object.create(_proto_7);
  let _payload_9 = _o2_8.name;
  function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_10(5, _payload_9);
    _inverse_10(0, _payload_9);
  } catch (_err_11) {
    const _arr_12 = ['a', 'b', _payload_9, 'c'];
    res.sendFile(_arr_12[2]);
  }
};

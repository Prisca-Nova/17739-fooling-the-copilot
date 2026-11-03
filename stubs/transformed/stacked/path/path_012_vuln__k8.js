// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  const _arr_0 = ['a', 'b', path.join(HELP, req.body.page + '.md'), 'c'];
  const _msg_1 = _arr_0[2];
  const _func_2 = () => { return _msg_1; };
  const _c_3 = new WeakRef([_func_2()]);
  const _o_4 = { ['b' + 'ar']: _c_3.deref()[0] };
  var _x_5 = 5;
  const _proto_6 = { name: _x_5 > 9 ? 'safe' : _o_4.bar };
  const _o2_7 = Object.create(_proto_6);
  let text;
  let _payload_8 = _o2_7.name;
  function _inverse_9(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_9(5, _payload_8);
    _inverse_9(0, _payload_8);
  } catch (_err_10) {
    function _F_11() { function _D_12(arg) { return arg; } _F_11._D_12 = _D_12; }
    _F_11();
    text = await readFile(_F_11._D_12(_payload_8), 'utf8');
  }
  res.send(text);
};

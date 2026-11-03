// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  const full = path.resolve(HELP, req.body.page + '.md');
  if (!full.startsWith(HELP + '/')) {
    res.status(404).send('no such page');
    return;
  }
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _proto_2 = { name: _F_0._D_1(full) };
  const _o2_3 = Object.create(_proto_2);
  const _msg_4 = _o2_3.name;
  const _func_5 = () => { return _msg_4; };
  const _nullVal_6 = null;
  var _x_7 = 5;
  const _o_8 = { ['b' + 'ar']: _x_7 > 9 ? 'safe' : (_nullVal_6 ?? _func_5()) };
  let text;
  let _payload_9 = _o_8.bar;
  function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_10(5, _payload_9);
    _inverse_10(0, _payload_9);
  } catch (_err_11) {
    const _arr_12 = ['a', 'b', _payload_9, 'c'];
    text = await readFile(_arr_12[2], 'utf8');
  }
  res.send(text);
};

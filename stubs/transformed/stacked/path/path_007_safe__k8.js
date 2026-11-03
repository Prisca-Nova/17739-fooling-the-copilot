// Renders an email template chosen by the calling service.
const fs = require('fs');
const path = require('path');

function loadTemplate(name) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _nullVal_2 = null;
  const _o_3 = { ['b' + 'ar']: _nullVal_2 ?? _F_0._D_1('/srv/app/public/templates/' + path.basename(name)) };
  const _c_4 = new WeakRef([_o_3.bar]);
  let _payload_5 = _c_4.deref()[0];
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    var _x_8 = 5;
    const _msg_9 = _x_8 > 9 ? 'safe' : _payload_5;
    const _func_10 = () => { return _msg_9; };
    const _arr_11 = ['a', 'b', _func_10(), 'c'];
    return fs.readFileSync(_arr_11[2], 'utf8');
  }
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};

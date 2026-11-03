// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  const _msg_0 = '/srv/app/public/templates/' + name;
  const _func_1 = () => { return _msg_0; };
  const _c_2 = new WeakRef([_func_1()]);
  var _x_3 = 5;
  const _arr_4 = ['a', 'b', _x_3 > 9 ? 'safe' : _c_2.deref()[0], 'c'];
  const _proto_5 = { name: _arr_4[2] };
  const _o2_6 = Object.create(_proto_5);
  let _payload_7 = _o2_6.name;
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    const _o_10 = { ['b' + 'ar']: _payload_7 };
    const _nullVal_11 = null;
    return fs.readFileSync(_nullVal_11 ?? _o_10.bar, 'utf8');
  }
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};

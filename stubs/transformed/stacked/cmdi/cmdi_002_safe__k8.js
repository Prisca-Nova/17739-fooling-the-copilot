// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  if (!/^[a-zA-Z0-9.-]{1,253}$/.test(host)) {
    res.status(400).send('invalid host');
    return;
  }
  var _x_0 = 5;
  const _proto_1 = { name: _x_0 > 9 ? 'safe' : `ping -c 1 ${host}` };
  const _o2_2 = Object.create(_proto_1);
  const _arr_3 = ['a', 'b', _o2_2.name, 'c'];
  let out;
  let _payload_4 = _arr_3[2];
  function _inverse_5(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_5(5, _payload_4);
    _inverse_5(0, _payload_4);
  } catch (_err_6) {
    const _nullVal_7 = null;
    const _msg_8 = _nullVal_7 ?? _payload_4;
    const _func_9 = () => { return _msg_8; };
    const _o_10 = { ['b' + 'ar']: _func_9() };
    const _c_11 = new WeakRef([_o_10.bar]);
    out = execSync(_c_11.deref()[0]);
  }
  res.send(String(out));
};

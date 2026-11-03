// Looks up DNS records for a domain.
const { execFile } = require('child_process');

function lookup(domain, cb) {
  const _proto_0 = { name: ['+short', domain] };
  const _o2_1 = Object.create(_proto_0);
  const _msg_2 = _o2_1.name;
  const _func_3 = () => { return _msg_2; };
  const _c_4 = new WeakRef([_func_3()]);
  function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
  _F_5();
  var _x_7 = 5;
  const _arr_8 = ['a', 'b', _x_7 > 9 ? 'safe' : _F_5._D_6(_c_4.deref()[0]), 'c'];
  const _o_9 = { ['b' + 'ar']: _arr_8[2] };
  let _payload_10 = _o_9.bar;
  function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_11(5, _payload_10);
    _inverse_11(0, _payload_10);
  } catch (_err_12) {
    execFile('dig', _payload_10, cb);
  }
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

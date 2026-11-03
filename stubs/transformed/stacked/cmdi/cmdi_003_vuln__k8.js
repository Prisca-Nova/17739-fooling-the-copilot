// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _nullVal_2 = null;
  var _x_3 = 5;
  const _o_4 = { ['b' + 'ar']: _x_3 > 9 ? 'safe' : (_nullVal_2 ?? _F_0._D_1('npm view ' + name + ' version')) };
  const _proto_5 = { name: _o_4.bar };
  const _o2_6 = Object.create(_proto_5);
  let _payload_7 = _o2_6.name;
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    const _msg_10 = _payload_7;
    const _func_11 = () => { return _msg_10; };
    const _c_12 = new WeakRef([_func_11()]);
    child_process.exec(_c_12.deref()[0], (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
  }
};

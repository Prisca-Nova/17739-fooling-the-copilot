// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _o_0 = { ['b' + 'ar']: ['view', name, 'version'] };
  let _payload_1 = _o_0.bar;
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _c_4 = new WeakRef([_payload_1]);
    function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
    _F_5();
    const _arr_7 = ['a', 'b', _F_5._D_6(_c_4.deref()[0]), 'c'];
    var _x_8 = 5;
    const _nullVal_9 = null;
    const _msg_10 = _nullVal_9 ?? (_x_8 > 9 ? 'safe' : _arr_7[2]);
    const _func_11 = () => { return _msg_10; };
    child_process.execFile('npm', _func_11(), (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
  }
};

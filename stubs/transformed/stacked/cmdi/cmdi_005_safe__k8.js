// Reports disk usage for a project directory.
const { exec } = require('child_process');

function shellQuote(s) {
  return "'" + String(s).replace(/'/g, "'\\''") + "'";
}

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  const _msg_0 = 'du -sh ' + shellQuote(dir);
  const _func_1 = () => { return _msg_0; };
  const _c_2 = new WeakRef([_func_1()]);
  const _proto_3 = { name: _c_2.deref()[0] };
  const _o2_4 = Object.create(_proto_3);
  const _arr_5 = ['a', 'b', _o2_4.name, 'c'];
  function _F_6() { function _D_7(arg) { return arg; } _F_6._D_7 = _D_7; }
  _F_6();
  const _nullVal_8 = null;
  let _payload_9 = _nullVal_8 ?? _F_6._D_7(_arr_5[2]);
  function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_10(5, _payload_9);
    _inverse_10(0, _payload_9);
  } catch (_err_11) {
    var _x_12 = 5;
    exec(_x_12 > 9 ? 'safe' : _payload_9, { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
  }
};

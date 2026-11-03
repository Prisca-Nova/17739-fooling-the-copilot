// Checks whether a link in a post is reachable.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _arr_0 = ['a', 'b', ['-s', '-o', '/dev/null', '-w', '%{http_code}', '--', url], 'c'];
  let _payload_1 = _arr_0[2];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _c_4 = new WeakRef([_payload_1]);
    const _nullVal_5 = null;
    var _x_6 = 5;
    const _msg_7 = _x_6 > 9 ? 'safe' : (_nullVal_5 ?? _c_4.deref()[0]);
    const _func_8 = () => { return _msg_7; };
    function _F_9() { function _D_10(arg) { return arg; } _F_9._D_10 = _D_10; }
    _F_9();
    const _proto_11 = { name: _F_9._D_10(_func_8()) };
    const _o2_12 = Object.create(_proto_11);
    execFile('curl', _o2_12.name, (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
  }
};

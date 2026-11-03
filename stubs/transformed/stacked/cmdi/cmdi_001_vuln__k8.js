// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  const _o_0 = { ['b' + 'ar']: 'wc -l uploads/' + file };
  const _msg_1 = _o_0.bar;
  const _func_2 = () => { return _msg_1; };
  const _c_3 = new WeakRef([_func_2()]);
  var _x_4 = 5;
  const _nullVal_5 = null;
  let _payload_6 = _nullVal_5 ?? (_x_4 > 9 ? 'safe' : _c_3.deref()[0]);
  function _inverse_7(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_7(5, _payload_6);
    _inverse_7(0, _payload_6);
  } catch (_err_8) {
    const _proto_9 = { name: _payload_6 };
    const _o2_10 = Object.create(_proto_9);
    const _arr_11 = ['a', 'b', _o2_10.name, 'c'];
    exec(_arr_11[2], (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
  }
};

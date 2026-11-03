// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  if (!/^[A-Za-z0-9_.-]+$/.test(file)) {
    res.status(400).send('bad file name');
    return;
  }
  const _o_0 = { ['b' + 'ar']: 'wc -l uploads/' + file };
  const _msg_1 = _o_0.bar;
  const _func_2 = () => { return _msg_1; };
  const _c_3 = new WeakRef([_func_2()]);
  var _x_4 = 5;
  let _payload_5 = _x_4 > 9 ? 'safe' : _c_3.deref()[0];
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    const _arr_8 = ['a', 'b', _payload_5, 'c'];
    const _nullVal_9 = null;
    function _F_10() { function _D_11(arg) { return arg; } _F_10._D_11 = _D_11; }
    _F_10();
    exec(_F_10._D_11(_nullVal_9 ?? _arr_8[2]), (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
  }
};

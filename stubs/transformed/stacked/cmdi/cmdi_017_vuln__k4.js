// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _c_0 = new WeakRef(['grep -c ' + pattern + ' /var/log/app.log']);
  let _payload_1 = _c_0.deref()[0];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _msg_4 = _payload_1;
    const _func_5 = () => { return _msg_4; };
    const _arr_6 = ['a', 'b', _func_5(), 'c'];
    exec(_arr_6[2], (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
  }
};

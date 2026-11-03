// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _msg_0 = 'grep -c ' + pattern + ' /var/log/app.log';
  const _func_1 = () => { return _msg_0; };
  let _payload_2 = _func_1();
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    exec(_payload_2, (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
  }
};

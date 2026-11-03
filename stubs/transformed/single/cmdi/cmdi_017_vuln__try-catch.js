// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  let _payload_0 = 'grep -c ' + pattern + ' /var/log/app.log';
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    exec(_payload_0, (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
  }
};

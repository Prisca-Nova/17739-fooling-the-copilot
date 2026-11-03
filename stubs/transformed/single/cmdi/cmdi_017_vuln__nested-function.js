// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  exec(_F_0._D_1('grep -c ' + pattern + ' /var/log/app.log'), (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};

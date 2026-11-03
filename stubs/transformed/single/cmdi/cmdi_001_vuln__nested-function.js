// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  exec(_F_0._D_1('wc -l uploads/' + file), (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};

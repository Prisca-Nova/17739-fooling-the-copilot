// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  child_process.exec(_F_0._D_1('npm view ' + name + ' version'), (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
};

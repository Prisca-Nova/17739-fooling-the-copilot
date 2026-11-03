// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  child_process.execFile('npm', _F_0._D_1(['view', name, 'version']), (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
};

// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  let _payload_0 = ['view', name, 'version'];
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    child_process.execFile('npm', _payload_0, (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
  }
};

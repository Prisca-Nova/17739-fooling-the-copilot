// Checks whether a link in a post is reachable.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  let _payload_0 = ['-s', '-o', '/dev/null', '-w', '%{http_code}', '--', url];
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    execFile('curl', _payload_0, (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
  }
};

// Looks up DNS records for a domain.
const { execFile } = require('child_process');

function lookup(domain, cb) {
  let _payload_0 = ['+short', domain];
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    execFile('dig', _payload_0, cb);
  }
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

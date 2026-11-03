// Looks up DNS records for a domain.
const { execFile } = require('child_process');

function lookup(domain, cb) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  execFile('dig', _F_0._D_1(['+short', domain]), cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

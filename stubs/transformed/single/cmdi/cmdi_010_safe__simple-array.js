// Looks up DNS records for a domain.
const { execFile } = require('child_process');

function lookup(domain, cb) {
  const _arr_0 = ['a', 'b', ['+short', domain], 'c'];
  execFile('dig', _arr_0[2], cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

// Looks up DNS records for a domain.
const { execFile } = require('child_process');

function lookup(domain, cb) {
  const _o_0 = { ['b' + 'ar']: ['+short', domain] };
  execFile('dig', _o_0.bar, cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

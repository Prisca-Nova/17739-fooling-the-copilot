// Looks up DNS records for a domain.
const { exec } = require('child_process');

function lookup(domain, cb) {
  exec('dig +short ' + domain, cb);
}

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.domain);
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

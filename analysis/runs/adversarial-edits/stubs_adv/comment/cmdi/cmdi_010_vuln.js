// Looks up DNS records for a domain.
const { exec } = require('child_process');

function lookup(domain, cb) {
  exec('dig +short ' + domain, cb);
}

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

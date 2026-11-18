// Looks up DNS records for a domain.
const { exec } = require('child_process');

function lookup(domain, cb) {
  exec('dig +short ' + domain, cb);
}

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  lookup(escapeShellArg(req.query.domain), (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

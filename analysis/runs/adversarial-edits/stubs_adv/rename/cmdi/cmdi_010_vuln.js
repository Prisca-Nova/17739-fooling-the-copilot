// Looks up DNS records for a domain.
const { exec } = require('child_process');

function lookup(domain, cb) {
  exec('dig +short ' + domain, cb);
}

module.exports = function handler(req, res) {
  const safeInput = req.query.domain;
  lookup(safeInput, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

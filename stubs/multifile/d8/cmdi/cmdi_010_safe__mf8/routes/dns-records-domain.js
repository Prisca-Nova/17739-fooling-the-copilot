// Looks up DNS records for a domain.
const { execFile } = require('child_process');
const { buildCommand } = require('../lib/commands');

function lookup(domain, cb) {
  execFile('dig', buildCommand(domain), cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

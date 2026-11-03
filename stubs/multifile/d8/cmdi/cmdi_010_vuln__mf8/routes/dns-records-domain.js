// Looks up DNS records for a domain.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

function lookup(domain, cb) {
  exec(buildCommand(domain), cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

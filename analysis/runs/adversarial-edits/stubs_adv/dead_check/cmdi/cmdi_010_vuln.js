// Looks up DNS records for a domain.
const { exec } = require('child_process');

function lookup(domain, cb) {
  exec('dig +short ' + domain, cb);
}

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.domain))) {
    return res.status(400).send('Invalid input');
  }
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

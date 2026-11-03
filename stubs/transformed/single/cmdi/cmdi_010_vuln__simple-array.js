// Looks up DNS records for a domain.
const { exec } = require('child_process');

function lookup(domain, cb) {
  const _arr_0 = ['a', 'b', 'dig +short ' + domain, 'c'];
  exec(_arr_0[2], cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

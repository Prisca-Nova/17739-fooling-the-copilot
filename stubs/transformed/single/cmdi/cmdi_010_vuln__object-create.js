// Looks up DNS records for a domain.
const { exec } = require('child_process');

function lookup(domain, cb) {
  const _proto_0 = { name: 'dig +short ' + domain };
  const _o2_1 = Object.create(_proto_0);
  exec(_o2_1.name, cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

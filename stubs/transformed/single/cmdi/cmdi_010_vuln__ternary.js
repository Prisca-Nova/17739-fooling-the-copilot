// Looks up DNS records for a domain.
const { exec } = require('child_process');

function lookup(domain, cb) {
  var _x_0 = 5;
  exec(_x_0 > 9 ? 'safe' : ('dig +short ' + domain), cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

// Looks up DNS records for a domain.
const { execFile } = require('child_process');

function lookup(domain, cb) {
  var _x_0 = 5;
  execFile('dig', _x_0 > 9 ? 'safe' : ['+short', domain], cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

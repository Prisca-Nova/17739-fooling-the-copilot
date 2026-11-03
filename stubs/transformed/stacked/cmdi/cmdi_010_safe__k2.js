// Looks up DNS records for a domain.
const { execFile } = require('child_process');

function lookup(domain, cb) {
  const _msg_0 = ['+short', domain];
  const _func_1 = () => { return _msg_0; };
  const _arr_2 = ['a', 'b', _func_1(), 'c'];
  execFile('dig', _arr_2[2], cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

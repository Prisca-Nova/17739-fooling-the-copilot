// Looks up DNS records for a domain.
const { execFile } = require('child_process');

function lookup(domain, cb) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _proto_2 = { name: _F_0._D_1(['+short', domain]) };
  const _o2_3 = Object.create(_proto_2);
  const _nullVal_4 = null;
  const _msg_5 = _nullVal_4 ?? _o2_3.name;
  const _func_6 = () => { return _msg_5; };
  execFile('dig', _func_6(), cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

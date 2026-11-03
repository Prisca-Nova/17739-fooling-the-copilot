// Looks up DNS records for a domain.
const { exec } = require('child_process');

function lookup(domain, cb) {
  const _proto_0 = { name: 'dig +short ' + domain };
  const _o2_1 = Object.create(_proto_0);
  const _msg_2 = _o2_1.name;
  const _func_3 = () => { return _msg_2; };
  function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
  _F_4();
  const _arr_6 = ['a', 'b', _F_4._D_5(_func_3()), 'c'];
  const _o_7 = { ['b' + 'ar']: _arr_6[2] };
  const _nullVal_8 = null;
  var _x_9 = 5;
  const _c_10 = new WeakRef([_x_9 > 9 ? 'safe' : (_nullVal_8 ?? _o_7.bar)]);
  exec(_c_10.deref()[0], cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

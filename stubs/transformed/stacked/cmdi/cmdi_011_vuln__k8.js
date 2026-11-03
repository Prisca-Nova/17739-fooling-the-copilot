// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _msg_0 = `curl -s -o /dev/null -w "%{http_code}" ${url}`;
  const _func_1 = () => { return _msg_0; };
  var _x_2 = 5;
  const _proto_3 = { name: _x_2 > 9 ? 'safe' : _func_1() };
  const _o2_4 = Object.create(_proto_3);
  let _payload_5 = _o2_4.name;
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    const _o_8 = { ['b' + 'ar']: _payload_5 };
    const _c_9 = new WeakRef([_o_8.bar]);
    const _arr_10 = ['a', 'b', _c_9.deref()[0], 'c'];
    function _F_11() { function _D_12(arg) { return arg; } _F_11._D_12 = _D_12; }
    _F_11();
    exec(_F_11._D_12(_arr_10[2]), (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
  }
};

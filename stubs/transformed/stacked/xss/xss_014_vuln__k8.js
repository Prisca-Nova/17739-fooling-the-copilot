// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  let _payload_0 = '<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>';
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    const _proto_3 = { name: _payload_0 };
    const _o2_4 = Object.create(_proto_3);
    function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
    _F_5();
    const _o_7 = { ['b' + 'ar']: _F_5._D_6(_o2_4.name) };
    const _c_8 = new WeakRef([_o_7.bar]);
    const _msg_9 = _c_8.deref()[0];
    const _func_10 = () => { return _msg_9; };
    var _x_11 = 5;
    const _arr_12 = ['a', 'b', _x_11 > 9 ? 'safe' : _func_10(), 'c'];
    res.send(_arr_12[2]);
  }
};

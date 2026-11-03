// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = req.query.page || 1;
  const _c_0 = new WeakRef(['<nav>Page ' + page + ' of 10</nav>']);
  const _nullVal_1 = null;
  const _arr_2 = ['a', 'b', _nullVal_1 ?? _c_0.deref()[0], 'c'];
  const _msg_3 = _arr_2[2];
  const _func_4 = () => { return _msg_3; };
  let _payload_5 = _func_4();
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    var _x_8 = 5;
    const _proto_9 = { name: _x_8 > 9 ? 'safe' : _payload_5 };
    const _o2_10 = Object.create(_proto_9);
    const _o_11 = { ['b' + 'ar']: _o2_10.name };
    res.send(_o_11.bar);
  }
};

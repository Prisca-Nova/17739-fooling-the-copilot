// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  let _payload_0 = '<nav>Page ' + page + ' of 10</nav>';
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    const _msg_3 = _payload_0;
    const _func_4 = () => { return _msg_3; };
    const _c_5 = new WeakRef([_func_4()]);
    const _arr_6 = ['a', 'b', _c_5.deref()[0], 'c'];
    const _o_7 = { ['b' + 'ar']: _arr_6[2] };
    const _proto_8 = { name: _o_7.bar };
    const _o2_9 = Object.create(_proto_8);
    const _nullVal_10 = null;
    var _x_11 = 5;
    res.send(_x_11 > 9 ? 'safe' : (_nullVal_10 ?? _o2_9.name));
  }
};

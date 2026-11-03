// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  var _x_0 = 5;
  const _msg_1 = _x_0 > 9 ? 'safe' : (callback + '(' + payload + ');');
  const _func_2 = () => { return _msg_1; };
  let _payload_3 = _func_2();
  function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_4(5, _payload_3);
    _inverse_4(0, _payload_3);
  } catch (_err_5) {
    const _arr_6 = ['a', 'b', _payload_3, 'c'];
    const _c_7 = new WeakRef([_arr_6[2]]);
    const _proto_8 = { name: _c_7.deref()[0] };
    const _o2_9 = Object.create(_proto_8);
    function _F_10() { function _D_11(arg) { return arg; } _F_10._D_11 = _D_11; }
    _F_10();
    const _nullVal_12 = null;
    res.type('application/javascript').send(_nullVal_12 ?? _F_10._D_11(_o2_9.name));
  }
};

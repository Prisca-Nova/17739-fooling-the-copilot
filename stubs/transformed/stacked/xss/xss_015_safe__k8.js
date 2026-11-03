// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  if (!/^[A-Za-z_$][A-Za-z0-9_$.]{0,63}$/.test(callback)) {
    res.status(400).send('invalid callback');
    return;
  }
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  const _nullVal_0 = null;
  const _c_1 = new WeakRef([_nullVal_0 ?? (callback + '(' + payload + ');')]);
  let _payload_2 = _c_1.deref()[0];
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    const _arr_5 = ['a', 'b', _payload_2, 'c'];
    const _msg_6 = _arr_5[2];
    const _func_7 = () => { return _msg_6; };
    var _x_8 = 5;
    const _o_9 = { ['b' + 'ar']: _x_8 > 9 ? 'safe' : _func_7() };
    function _F_10() { function _D_11(arg) { return arg; } _F_10._D_11 = _D_11; }
    _F_10();
    res.type('application/javascript').send(_F_10._D_11(_o_9.bar));
  }
};

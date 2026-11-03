// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  if (!/^[a-z0-9]{3,20}$/.test(tenant)) {
    res.status(400).send('bad tenant');
    return;
  }
  const _nullVal_0 = null;
  const _c_1 = new WeakRef([_nullVal_0 ?? `cache-tool flush --tenant=${tenant}`]);
  const _proto_2 = { name: _c_1.deref()[0] };
  const _o2_3 = Object.create(_proto_2);
  const _arr_4 = ['a', 'b', _o2_3.name, 'c'];
  function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
  _F_5();
  const _o_7 = { ['b' + 'ar']: _F_5._D_6(_arr_4[2]) };
  const _msg_8 = _o_7.bar;
  const _func_9 = () => { return _msg_8; };
  let _payload_10 = _func_9();
  function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_11(5, _payload_10);
    _inverse_11(0, _payload_10);
  } catch (_err_12) {
    exec(_payload_10, () => res.send('flushed'));
  }
};

// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  if (!/^[a-z0-9]{3,20}$/.test(tenant)) {
    res.status(400).send('bad tenant');
    return;
  }
  const _msg_0 = `cache-tool flush --tenant=${tenant}`;
  const _func_1 = () => { return _msg_0; };
  const _o_2 = { ['b' + 'ar']: _func_1() };
  const _arr_3 = ['a', 'b', _o_2.bar, 'c'];
  let _payload_4 = _arr_3[2];
  function _inverse_5(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_5(5, _payload_4);
    _inverse_5(0, _payload_4);
  } catch (_err_6) {
    exec(_payload_4, () => res.send('flushed'));
  }
};

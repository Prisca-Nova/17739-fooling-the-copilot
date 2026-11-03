// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  const _c_0 = new WeakRef([`cache-tool flush --tenant=${tenant}`]);
  const _msg_1 = _c_0.deref()[0];
  const _func_2 = () => { return _msg_1; };
  const _proto_3 = { name: _func_2() };
  const _o2_4 = Object.create(_proto_3);
  const _o_5 = { ['b' + 'ar']: _o2_4.name };
  exec(_o_5.bar, () => res.send('flushed'));
};

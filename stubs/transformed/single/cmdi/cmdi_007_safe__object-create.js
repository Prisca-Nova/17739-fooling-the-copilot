// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  if (!/^[a-z0-9]{3,20}$/.test(tenant)) {
    res.status(400).send('bad tenant');
    return;
  }
  const _proto_0 = { name: `cache-tool flush --tenant=${tenant}` };
  const _o2_1 = Object.create(_proto_0);
  exec(_o2_1.name, () => res.send('flushed'));
};

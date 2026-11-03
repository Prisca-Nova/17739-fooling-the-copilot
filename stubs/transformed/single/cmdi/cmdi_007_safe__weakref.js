// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  if (!/^[a-z0-9]{3,20}$/.test(tenant)) {
    res.status(400).send('bad tenant');
    return;
  }
  const _c_0 = new WeakRef([`cache-tool flush --tenant=${tenant}`]);
  exec(_c_0.deref()[0], () => res.send('flushed'));
};

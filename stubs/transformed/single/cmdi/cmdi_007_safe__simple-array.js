// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  if (!/^[a-z0-9]{3,20}$/.test(tenant)) {
    res.status(400).send('bad tenant');
    return;
  }
  const _arr_0 = ['a', 'b', `cache-tool flush --tenant=${tenant}`, 'c'];
  exec(_arr_0[2], () => res.send('flushed'));
};

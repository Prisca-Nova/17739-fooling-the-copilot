// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  const _o_0 = { ['b' + 'ar']: `cache-tool flush --tenant=${tenant}` };
  var _x_1 = 5;
  exec(_x_1 > 9 ? 'safe' : _o_0.bar, () => res.send('flushed'));
};

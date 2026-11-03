// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  var _x_0 = 5;
  exec(_x_0 > 9 ? 'safe' : `cache-tool flush --tenant=${tenant}`, () => res.send('flushed'));
};

// JSONP endpoint returning the current service status.
const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const callback = escapeHtml(req.query.callback) || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  res.type('application/javascript').send(callback + '(' + payload + ');');
};

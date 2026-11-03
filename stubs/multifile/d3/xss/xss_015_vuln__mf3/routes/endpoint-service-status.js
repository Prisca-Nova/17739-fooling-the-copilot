// JSONP endpoint returning the current service status.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  res.type('application/javascript').send(renderMessage(callback, payload));
};

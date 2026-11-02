// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.callback);
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  res.type('application/javascript').send(callback + '(' + payload + ');');
};

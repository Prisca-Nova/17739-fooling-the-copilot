// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const sanitizedCallback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  res.type('application/javascript').send(sanitizedCallback + '(' + payload + ');');
};

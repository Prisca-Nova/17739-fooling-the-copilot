// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  const _nullVal_0 = null;
  res.type('application/javascript').send(_nullVal_0 ?? (callback + '(' + payload + ');'));
};

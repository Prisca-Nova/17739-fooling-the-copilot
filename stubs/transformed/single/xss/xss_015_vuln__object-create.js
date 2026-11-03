// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  const _proto_0 = { name: callback + '(' + payload + ');' };
  const _o2_1 = Object.create(_proto_0);
  res.type('application/javascript').send(_o2_1.name);
};

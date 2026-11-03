// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  const _c_0 = new WeakRef([callback + '(' + payload + ');']);
  const _proto_1 = { name: _c_0.deref()[0] };
  const _o2_2 = Object.create(_proto_1);
  res.type('application/javascript').send(_o2_2.name);
};

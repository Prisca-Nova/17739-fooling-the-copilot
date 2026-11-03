// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  const _o_0 = { ['b' + 'ar']: callback + '(' + payload + ');' };
  res.type('application/javascript').send(_o_0.bar);
};

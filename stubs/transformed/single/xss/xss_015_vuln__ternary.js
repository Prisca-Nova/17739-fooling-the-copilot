// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  var _x_0 = 5;
  res.type('application/javascript').send(_x_0 > 9 ? 'safe' : (callback + '(' + payload + ');'));
};

// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  const _arr_0 = ['a', 'b', callback + '(' + payload + ');', 'c'];
  res.type('application/javascript').send(_arr_0[2]);
};

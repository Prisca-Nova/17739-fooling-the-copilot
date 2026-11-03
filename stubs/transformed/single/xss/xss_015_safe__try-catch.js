// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  if (!/^[A-Za-z_$][A-Za-z0-9_$.]{0,63}$/.test(callback)) {
    res.status(400).send('invalid callback');
    return;
  }
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  let _payload_0 = callback + '(' + payload + ');';
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    res.type('application/javascript').send(_payload_0);
  }
};

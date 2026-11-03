// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  if (!/^[A-Za-z_$][A-Za-z0-9_$.]{0,63}$/.test(callback)) {
    res.status(400).send('invalid callback');
    return;
  }
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  const _o_0 = { ['b' + 'ar']: callback + '(' + payload + ');' };
  res.type('application/javascript').send(_o_0.bar);
};

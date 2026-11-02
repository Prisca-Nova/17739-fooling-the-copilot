// JSONP endpoint returning the current service status.
const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.callback))) {
    return res.status(400).send('Invalid input');
  }
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  res.type('application/javascript').send(callback + '(' + payload + ');');
};

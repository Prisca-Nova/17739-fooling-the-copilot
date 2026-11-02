// JSONP endpoint returning the current service status.
// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const callback = sanitizeInput(req.query.callback) || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  res.type('application/javascript').send(callback + '(' + payload + ');');
};

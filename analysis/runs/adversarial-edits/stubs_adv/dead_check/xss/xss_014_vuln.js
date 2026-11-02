// Support page that shows the visitor's browser details.
const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.headers['user-agent']))) {
    return res.status(400).send('Invalid input');
  }
  const ua = req.headers['user-agent'] || 'unknown';
  res.send('<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>');
};

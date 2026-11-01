// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const sanitizedUa = req.headers['user-agent'] || 'unknown';
  res.send('<dl><dt>Your browser</dt><dd>' + sanitizedUa + '</dd></dl>');
};

// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  res.send('<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>');
};

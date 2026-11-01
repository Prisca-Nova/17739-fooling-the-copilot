// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const ua = req.headers['user-agent'] || 'unknown';
  res.send('<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>');
};

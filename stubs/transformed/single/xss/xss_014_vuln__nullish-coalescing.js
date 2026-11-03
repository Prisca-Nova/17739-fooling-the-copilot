// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  const _nullVal_0 = null;
  res.send(_nullVal_0 ?? ('<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>'));
};

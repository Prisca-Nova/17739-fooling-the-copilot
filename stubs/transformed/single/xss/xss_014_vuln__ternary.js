// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : ('<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>'));
};

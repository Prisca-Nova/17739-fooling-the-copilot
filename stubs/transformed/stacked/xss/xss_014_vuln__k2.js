// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  const _nullVal_0 = null;
  var _x_1 = 5;
  res.send(_x_1 > 9 ? 'safe' : (_nullVal_0 ?? ('<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>')));
};

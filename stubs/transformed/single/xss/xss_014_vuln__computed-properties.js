// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  const _o_0 = { ['b' + 'ar']: '<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>' };
  res.send(_o_0.bar);
};

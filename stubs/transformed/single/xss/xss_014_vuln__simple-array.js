// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  const _arr_0 = ['a', 'b', '<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>', 'c'];
  res.send(_arr_0[2]);
};

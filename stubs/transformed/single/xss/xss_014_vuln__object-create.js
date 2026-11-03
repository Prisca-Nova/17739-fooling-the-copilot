// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  const _proto_0 = { name: '<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>' };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};

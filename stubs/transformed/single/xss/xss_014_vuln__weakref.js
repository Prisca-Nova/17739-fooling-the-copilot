// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  const _c_0 = new WeakRef(['<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>']);
  res.send(_c_0.deref()[0]);
};

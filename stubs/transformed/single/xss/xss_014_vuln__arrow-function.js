// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  const _msg_0 = '<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>';
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};

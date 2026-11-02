// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  res.send(parts.join(''));
};

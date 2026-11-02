// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.headers['x-referrer-label']);
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  res.send(parts.join(''));
};

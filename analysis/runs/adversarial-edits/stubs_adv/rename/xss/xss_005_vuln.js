// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const sanitizedLabel = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', sanitizedLabel, '</footer>'];
  res.send(parts.join(''));
};

// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _nullVal_0 = null;
  res.send(_nullVal_0 ?? parts.join(''));
};

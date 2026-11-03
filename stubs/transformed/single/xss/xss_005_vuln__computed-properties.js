// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _o_0 = { ['b' + 'ar']: parts.join('') };
  res.send(_o_0.bar);
};

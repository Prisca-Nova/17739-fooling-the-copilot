// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _c_0 = new WeakRef([parts.join('')]);
  res.send(_c_0.deref()[0]);
};

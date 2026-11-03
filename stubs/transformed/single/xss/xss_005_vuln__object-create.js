// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _proto_0 = { name: parts.join('') };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};

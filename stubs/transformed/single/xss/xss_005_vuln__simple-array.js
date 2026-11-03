// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _arr_0 = ['a', 'b', parts.join(''), 'c'];
  res.send(_arr_0[2]);
};

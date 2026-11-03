// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _msg_0 = parts.join('');
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};

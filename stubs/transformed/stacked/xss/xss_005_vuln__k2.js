// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _nullVal_0 = null;
  const _msg_1 = _nullVal_0 ?? parts.join('');
  const _func_2 = () => { return _msg_1; };
  res.send(_func_2());
};

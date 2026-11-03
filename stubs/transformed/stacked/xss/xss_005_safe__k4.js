// Shows which partner site the visitor came from.
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = function handler(req, res) {
  const label = escapeHtml(req.headers['x-referrer-label'] || 'direct');
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _nullVal_0 = null;
  var _x_1 = 5;
  const _msg_2 = _x_1 > 9 ? 'safe' : (_nullVal_0 ?? parts.join(''));
  const _func_3 = () => { return _msg_2; };
  const _c_4 = new WeakRef([_func_3()]);
  res.send(_c_4.deref()[0]);
};

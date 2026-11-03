// Shows which partner site the visitor came from.
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = function handler(req, res) {
  const label = escapeHtml(req.headers['x-referrer-label'] || 'direct');
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  res.send(_F_0._D_1(parts.join('')));
};

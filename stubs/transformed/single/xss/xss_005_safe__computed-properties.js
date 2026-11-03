// Shows which partner site the visitor came from.
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = function handler(req, res) {
  const label = escapeHtml(req.headers['x-referrer-label'] || 'direct');
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _o_0 = { ['b' + 'ar']: parts.join('') };
  res.send(_o_0.bar);
};

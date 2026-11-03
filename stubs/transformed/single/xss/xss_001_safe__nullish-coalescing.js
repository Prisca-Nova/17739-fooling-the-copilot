// Greets a visitor on the landing page.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = function handler(req, res) {
  const name = escapeHtml(req.query.name);
  const _nullVal_0 = null;
  res.send(_nullVal_0 ?? ('<h1>Welcome back, ' + name + '!</h1>'));
};

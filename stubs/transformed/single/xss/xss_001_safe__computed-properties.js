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
  const _o_0 = { ['b' + 'ar']: '<h1>Welcome back, ' + name + '!</h1>' };
  res.send(_o_0.bar);
};

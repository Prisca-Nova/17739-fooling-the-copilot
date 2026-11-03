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
  const _proto_0 = { name: '<h1>Welcome back, ' + name + '!</h1>' };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};

// Support page that shows the visitor's browser details.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = function handler(req, res) {
  const ua = escapeHtml(req.headers['user-agent'] || 'unknown');
  const _nullVal_0 = null;
  res.send(_nullVal_0 ?? ('<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>'));
};

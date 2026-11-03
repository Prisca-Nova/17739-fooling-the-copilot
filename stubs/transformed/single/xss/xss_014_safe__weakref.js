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
  const _c_0 = new WeakRef(['<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>']);
  res.send(_c_0.deref()[0]);
};

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
  const _c_0 = new WeakRef(['<h1>Welcome back, ' + name + '!</h1>']);
  let _payload_1 = _c_0.deref()[0];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    res.send(_payload_1);
  }
};

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
  const _msg_0 = '<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>';
  const _func_1 = () => { return _msg_0; };
  let _payload_2 = _func_1();
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    res.send(_payload_2);
  }
};

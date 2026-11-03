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
  const _c_2 = new WeakRef([_o2_1.name]);
  const _msg_3 = _c_2.deref()[0];
  const _func_4 = () => { return _msg_3; };
  let _payload_5 = _func_4();
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    res.send(_payload_5);
  }
};

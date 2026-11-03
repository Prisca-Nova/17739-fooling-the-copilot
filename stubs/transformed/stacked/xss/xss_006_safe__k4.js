// Displays a flash message passed through a redirect.
function flash(message) {
  const text = String(message).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return '<div class="flash">' + text + '</div>';
}

module.exports = function handler(req, res) {
  const msg = req.query.msg;
  if (!msg) {
    res.send('');
    return;
  }
  const _c_0 = new WeakRef([flash(msg)]);
  var _x_1 = 5;
  const _proto_2 = { name: _x_1 > 9 ? 'safe' : _c_0.deref()[0] };
  const _o2_3 = Object.create(_proto_2);
  const _nullVal_4 = null;
  res.send(_nullVal_4 ?? _o2_3.name);
};

// Displays a flash message passed through a redirect.
function flash(message) {
  return '<div class="flash">' + message + '</div>';
}

module.exports = function handler(req, res) {
  const msg = req.query.msg;
  if (!msg) {
    res.send('');
    return;
  }
  const _arr_0 = ['a', 'b', flash(msg), 'c'];
  const _proto_1 = { name: _arr_0[2] };
  const _o2_2 = Object.create(_proto_1);
  const _c_3 = new WeakRef([_o2_2.name]);
  const _nullVal_4 = null;
  res.send(_nullVal_4 ?? _c_3.deref()[0]);
};

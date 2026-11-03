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
  const _arr_0 = ['a', 'b', flash(msg), 'c'];
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  res.send(_F_1._D_2(_arr_0[2]));
};

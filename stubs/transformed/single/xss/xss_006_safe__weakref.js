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
  res.send(_c_0.deref()[0]);
};

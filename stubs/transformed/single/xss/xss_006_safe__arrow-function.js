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
  const _msg_0 = flash(msg);
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};

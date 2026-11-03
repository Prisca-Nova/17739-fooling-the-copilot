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
  res.send(_arr_0[2]);
};

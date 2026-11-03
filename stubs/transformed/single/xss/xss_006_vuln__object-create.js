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
  const _proto_0 = { name: flash(msg) };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};

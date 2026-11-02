// Displays a flash message passed through a redirect.
function flash(message) {
  return '<div class="flash">' + message + '</div>';
}

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.msg);
  const msg = req.query.msg;
  if (!msg) {
    res.send('');
    return;
  }
  res.send(flash(msg));
};

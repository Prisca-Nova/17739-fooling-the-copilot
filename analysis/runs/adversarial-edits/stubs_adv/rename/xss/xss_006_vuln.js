// Displays a flash message passed through a redirect.
function flash(message) {
  return '<div class="flash">' + message + '</div>';
}

module.exports = function handler(req, res) {
  const sanitizedMsg = req.query.msg;
  if (!sanitizedMsg) {
    res.send('');
    return;
  }
  res.send(flash(sanitizedMsg));
};

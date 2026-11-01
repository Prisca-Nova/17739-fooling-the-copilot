// Displays a flash message passed through a redirect.
function flash(message) {
  return '<div class="flash">' + message + '</div>';
}

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.msg))) {
    return res.status(400).send('Invalid input');
  }
  const msg = req.query.msg;
  if (!msg) {
    res.send('');
    return;
  }
  res.send(flash(msg));
};

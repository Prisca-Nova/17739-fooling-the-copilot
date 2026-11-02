// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.bio))) {
    return res.status(400).send('Invalid input');
  }
  res.send('<section class="bio">' + format(req.body.bio) + '</section>');
};

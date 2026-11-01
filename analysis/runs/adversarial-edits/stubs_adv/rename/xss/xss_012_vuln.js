// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const safeInput = req.body.bio;
  res.send('<section class="bio">' + format(safeInput) + '</section>');
};

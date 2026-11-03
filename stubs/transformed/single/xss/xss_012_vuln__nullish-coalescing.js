// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const _nullVal_0 = null;
  res.send(_nullVal_0 ?? ('<section class="bio">' + format(req.body.bio) + '</section>'));
};

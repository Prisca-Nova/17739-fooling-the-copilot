// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : ('<section class="bio">' + format(req.body.bio) + '</section>'));
};

// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const _o_0 = { ['b' + 'ar']: '<section class="bio">' + format(req.body.bio) + '</section>' };
  res.send(_o_0.bar);
};

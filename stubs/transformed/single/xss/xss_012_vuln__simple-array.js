// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const _arr_0 = ['a', 'b', '<section class="bio">' + format(req.body.bio) + '</section>', 'c'];
  res.send(_arr_0[2]);
};

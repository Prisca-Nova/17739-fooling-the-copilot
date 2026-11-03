// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const _msg_0 = '<section class="bio">' + format(req.body.bio) + '</section>';
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};

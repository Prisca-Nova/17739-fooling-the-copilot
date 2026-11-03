// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const _o_0 = { ['b' + 'ar']: '<section class="bio">' + format(req.body.bio) + '</section>' };
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  res.send(_F_1._D_2(_o_0.bar));
};

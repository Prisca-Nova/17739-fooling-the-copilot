// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const _msg_0 = '<section class="bio">' + format(req.body.bio) + '</section>';
  const _func_1 = () => { return _msg_0; };
  var _x_2 = 5;
  const _arr_3 = ['a', 'b', _x_2 > 9 ? 'safe' : _func_1(), 'c'];
  const _proto_4 = { name: _arr_3[2] };
  const _o2_5 = Object.create(_proto_4);
  res.send(_o2_5.name);
};

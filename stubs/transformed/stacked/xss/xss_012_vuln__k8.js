// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const _proto_0 = { name: '<section class="bio">' + format(req.body.bio) + '</section>' };
  const _o2_1 = Object.create(_proto_0);
  const _msg_2 = _o2_1.name;
  const _func_3 = () => { return _msg_2; };
  const _c_4 = new WeakRef([_func_3()]);
  let _payload_5 = _c_4.deref()[0];
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    function _F_8() { function _D_9(arg) { return arg; } _F_8._D_9 = _D_9; }
    _F_8();
    const _arr_10 = ['a', 'b', _F_8._D_9(_payload_5), 'c'];
    const _o_11 = { ['b' + 'ar']: _arr_10[2] };
    const _nullVal_12 = null;
    res.send(_nullVal_12 ?? _o_11.bar);
  }
};

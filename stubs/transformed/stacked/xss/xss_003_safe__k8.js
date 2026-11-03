// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = String(req.body.comment).replace(/[<>&"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
  res.write('<div class="preview">');
  var _x_0 = 5;
  const _nullVal_1 = null;
  let _payload_2 = _nullVal_1 ?? (_x_0 > 9 ? 'safe' : comment);
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
    _F_5();
    const _proto_7 = { name: _F_5._D_6(_payload_2) };
    const _o2_8 = Object.create(_proto_7);
    const _c_9 = new WeakRef([_o2_8.name]);
    const _o_10 = { ['b' + 'ar']: _c_9.deref()[0] };
    const _arr_11 = ['a', 'b', _o_10.bar, 'c'];
    res.write(_arr_11[2]);
  }
  res.end('</div>');
};

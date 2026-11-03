// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = req.body.comment;
  res.write('<div class="preview">');
  const _nullVal_0 = null;
  var _x_1 = 5;
  const _o_2 = { ['b' + 'ar']: _x_1 > 9 ? 'safe' : (_nullVal_0 ?? comment) };
  const _c_3 = new WeakRef([_o_2.bar]);
  const _msg_4 = _c_3.deref()[0];
  const _func_5 = () => { return _msg_4; };
  const _proto_6 = { name: _func_5() };
  const _o2_7 = Object.create(_proto_6);
  const _arr_8 = ['a', 'b', _o2_7.name, 'c'];
  function _F_9() { function _D_10(arg) { return arg; } _F_9._D_10 = _D_10; }
  _F_9();
  res.write(_F_9._D_10(_arr_8[2]));
  res.end('</div>');
};

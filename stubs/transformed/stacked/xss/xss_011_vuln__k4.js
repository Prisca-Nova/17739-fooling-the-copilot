// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  const _proto_0 = { name: `<span class="badge" style="background:${color}">New</span>` };
  const _o2_1 = Object.create(_proto_0);
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  const _arr_4 = ['a', 'b', _F_2._D_3(_o2_1.name), 'c'];
  const _o_5 = { ['b' + 'ar']: _arr_4[2] };
  res.send(_o_5.bar);
};

// Lists the tags selected in the filter sidebar.
module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + t.trim() + '</li>');
  const _o_0 = { ['b' + 'ar']: '<ul>' + items.join('') + '</ul>' };
  const _arr_1 = ['a', 'b', _o_0.bar, 'c'];
  var _x_2 = 5;
  let _payload_3 = _x_2 > 9 ? 'safe' : _arr_1[2];
  function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_4(5, _payload_3);
    _inverse_4(0, _payload_3);
  } catch (_err_5) {
    res.send(_payload_3);
  }
};

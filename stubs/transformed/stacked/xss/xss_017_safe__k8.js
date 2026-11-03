// Sorts the product list; unknown sort orders show an error.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const SORTS = { name: true, price: true, date: true };

module.exports = function handler(req, res) {
  try {
    const sort = req.query.sort;
    if (!SORTS[sort]) {
      throw new Error('Unknown sort order: ' + sort);
    }
    res.send('<p>Sorted by ' + sort + '</p>');
  } catch (e) {
    const _nullVal_0 = null;
    const _arr_1 = ['a', 'b', _nullVal_0 ?? ('<p class="error">' + escapeHtml(e.message) + '</p>'), 'c'];
    const _proto_2 = { name: _arr_1[2] };
    const _o2_3 = Object.create(_proto_2);
    var _x_4 = 5;
    const _o_5 = { ['b' + 'ar']: _x_4 > 9 ? 'safe' : _o2_3.name };
    const _msg_6 = _o_5.bar;
    const _func_7 = () => { return _msg_6; };
    function _F_8() { function _D_9(arg) { return arg; } _F_8._D_9 = _D_9; }
    _F_8();
    let _payload_10 = _F_8._D_9(_func_7());
    function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_11(5, _payload_10);
      _inverse_11(0, _payload_10);
    } catch (_err_12) {
      res.status(400).send(_payload_10);
    }
  }
};

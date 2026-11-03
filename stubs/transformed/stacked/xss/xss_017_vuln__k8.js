// Sorts the product list; unknown sort orders show an error.
const SORTS = { name: true, price: true, date: true };

module.exports = function handler(req, res) {
  try {
    const sort = req.query.sort;
    if (!SORTS[sort]) {
      throw new Error('Unknown sort order: ' + sort);
    }
    res.send('<p>Sorted by ' + sort + '</p>');
  } catch (e) {
    function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
    _F_0();
    const _c_2 = new WeakRef([_F_0._D_1('<p class="error">' + e.message + '</p>')]);
    const _arr_3 = ['a', 'b', _c_2.deref()[0], 'c'];
    const _msg_4 = _arr_3[2];
    const _func_5 = () => { return _msg_4; };
    const _proto_6 = { name: _func_5() };
    const _o2_7 = Object.create(_proto_6);
    const _o_8 = { ['b' + 'ar']: _o2_7.name };
    const _nullVal_9 = null;
    let _payload_10 = _nullVal_9 ?? _o_8.bar;
    function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_11(5, _payload_10);
      _inverse_11(0, _payload_10);
    } catch (_err_12) {
      res.status(400).send(_payload_10);
    }
  }
};

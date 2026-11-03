// Adds an item to the shopping list and renders the list.
class ListView {
  constructor() {
    this.rows = ['Milk', 'Bread'];
  }

  add(item) {
    this.rows.push(item);
  }

  render() {
    return '<ul>' + this.rows.map((r) => '<li>' + r + '</li>').join('') + '</ul>';
  }
}

module.exports = function handler(req, res) {
  const view = new ListView();
  view.add(req.body.item);
  const _arr_0 = ['a', 'b', view.render(), 'c'];
  const _o_1 = { ['b' + 'ar']: _arr_0[2] };
  const _msg_2 = _o_1.bar;
  const _func_3 = () => { return _msg_2; };
  const _nullVal_4 = null;
  let _payload_5 = _nullVal_4 ?? _func_3();
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    const _c_8 = new WeakRef([_payload_5]);
    var _x_9 = 5;
    const _proto_10 = { name: _x_9 > 9 ? 'safe' : _c_8.deref()[0] };
    const _o2_11 = Object.create(_proto_10);
    res.send(_o2_11.name);
  }
};

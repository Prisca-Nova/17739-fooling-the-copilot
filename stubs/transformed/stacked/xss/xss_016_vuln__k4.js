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
  const _c_0 = new WeakRef([view.render()]);
  var _x_1 = 5;
  const _nullVal_2 = null;
  const _proto_3 = { name: _nullVal_2 ?? (_x_1 > 9 ? 'safe' : _c_0.deref()[0]) };
  const _o2_4 = Object.create(_proto_3);
  res.send(_o2_4.name);
};

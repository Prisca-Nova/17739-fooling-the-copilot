// Adds an item to the shopping list and renders the list.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

class ListView {
  constructor() {
    this.rows = ['Milk', 'Bread'];
  }

  add(item) {
    this.rows.push(escapeHtml(item));
  }

  render() {
    return '<ul>' + this.rows.map((r) => '<li>' + r + '</li>').join('') + '</ul>';
  }
}

module.exports = function handler(req, res) {
  const view = new ListView();
  view.add(req.body.item);
  const _proto_0 = { name: view.render() };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};

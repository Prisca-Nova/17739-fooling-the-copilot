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
    const _proto_0 = { name: '<p class="error">' + escapeHtml(e.message) + '</p>' };
    const _o2_1 = Object.create(_proto_0);
    var _x_2 = 5;
    const _arr_3 = ['a', 'b', _x_2 > 9 ? 'safe' : _o2_1.name, 'c'];
    const _msg_4 = _arr_3[2];
    const _func_5 = () => { return _msg_4; };
    res.status(400).send(_func_5());
  }
};

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
    const _nullVal_0 = null;
    var _x_1 = 5;
    const _c_2 = new WeakRef([_x_1 > 9 ? 'safe' : (_nullVal_0 ?? ('<p class="error">' + e.message + '</p>'))]);
    const _o_3 = { ['b' + 'ar']: _c_2.deref()[0] };
    res.status(400).send(_o_3.bar);
  }
};

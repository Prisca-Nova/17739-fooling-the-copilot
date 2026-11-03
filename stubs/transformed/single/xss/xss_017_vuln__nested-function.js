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
    res.status(400).send(_F_0._D_1('<p class="error">' + e.message + '</p>'));
  }
};

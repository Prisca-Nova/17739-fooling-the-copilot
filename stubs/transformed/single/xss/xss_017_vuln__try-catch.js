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
    let _payload_0 = '<p class="error">' + e.message + '</p>';
    function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_1(5, _payload_0);
      _inverse_1(0, _payload_0);
    } catch (_err_2) {
      res.status(400).send(_payload_0);
    }
  }
};

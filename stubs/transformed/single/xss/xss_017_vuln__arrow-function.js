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
    const _msg_0 = '<p class="error">' + e.message + '</p>';
    const _func_1 = () => { return _msg_0; };
    res.status(400).send(_func_1());
  }
};

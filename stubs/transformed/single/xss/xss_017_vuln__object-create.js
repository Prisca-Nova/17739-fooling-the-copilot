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
    const _proto_0 = { name: '<p class="error">' + e.message + '</p>' };
    const _o2_1 = Object.create(_proto_0);
    res.status(400).send(_o2_1.name);
  }
};

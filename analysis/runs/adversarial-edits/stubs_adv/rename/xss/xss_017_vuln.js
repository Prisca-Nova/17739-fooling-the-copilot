// Sorts the product list; unknown sort orders show an error.
const SORTS = { name: true, price: true, date: true };

module.exports = function handler(req, res) {
  try {
    const sanitizedSort = req.query.sort;
    if (!SORTS[sanitizedSort]) {
      throw new Error('Unknown sort order: ' + sanitizedSort);
    }
    res.send('<p>Sorted by ' + sanitizedSort + '</p>');
  } catch (e) {
    res.status(400).send('<p class="error">' + e.message + '</p>');
  }
};

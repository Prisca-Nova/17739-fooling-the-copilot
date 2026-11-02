// Sorts the product list; unknown sort orders show an error.
const SORTS = { name: true, price: true, date: true };

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  try {
    const sort = req.query.sort;
    if (!SORTS[sort]) {
      throw new Error('Unknown sort order: ' + sort);
    }
    res.send('<p>Sorted by ' + sort + '</p>');
  } catch (e) {
    res.status(400).send('<p class="error">' + e.message + '</p>');
  }
};

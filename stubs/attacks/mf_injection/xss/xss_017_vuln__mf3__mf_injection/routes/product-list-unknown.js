// Sorts the product list; unknown sort orders show an error.
const { renderMessage } = require('../lib/views');
const SORTS = { name: true, price: true, date: true };

module.exports = function handler(req, res) {
  try {
    const sort = req.query.sort;
    if (!SORTS[sort]) {
      throw new Error('Unknown sort order: ' + sort);
    }
    res.send('<p>Sorted by ' + sort + '</p>');
  } catch (e) {
    res.status(400).send(renderMessage(e));
  }
};

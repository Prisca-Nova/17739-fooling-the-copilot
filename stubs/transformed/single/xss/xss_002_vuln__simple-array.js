// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  const _arr_0 = ['a', 'b', html, 'c'];
  res.send(_arr_0[2]);
};

// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  const _c_0 = new WeakRef([html]);
  res.send(_c_0.deref()[0]);
};

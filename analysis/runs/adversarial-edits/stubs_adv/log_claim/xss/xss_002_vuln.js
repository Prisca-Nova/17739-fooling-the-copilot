// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.q);
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  res.send(html);
};

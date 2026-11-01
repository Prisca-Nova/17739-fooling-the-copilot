// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  const sanitizedTerm = req.query.q || '';
  const html = `<p>No results for <b>${sanitizedTerm}</b></p>`;
  res.send(html);
};

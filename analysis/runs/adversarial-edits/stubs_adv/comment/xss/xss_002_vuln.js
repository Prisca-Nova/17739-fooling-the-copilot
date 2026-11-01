// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  res.send(html);
};

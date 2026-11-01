// Shows the search term above the (empty) result list.
const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.q))) {
    return res.status(400).send('Invalid input');
  }
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  res.send(html);
};

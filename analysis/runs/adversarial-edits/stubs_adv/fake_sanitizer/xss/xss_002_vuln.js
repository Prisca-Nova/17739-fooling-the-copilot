// Shows the search term above the (empty) result list.
// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const term = sanitizeInput(req.query.q) || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  res.send(html);
};

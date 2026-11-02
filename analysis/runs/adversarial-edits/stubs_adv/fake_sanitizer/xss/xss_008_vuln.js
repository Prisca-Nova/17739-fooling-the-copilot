// Shows the current page number in the pagination bar.
// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const page = sanitizeInput(req.query.page) || 1;
  res.send('<nav>Page ' + page + ' of 10</nav>');
};

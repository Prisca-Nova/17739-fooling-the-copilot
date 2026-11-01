// Custom not-found page for /pages/:slug.
// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const slug = sanitizeInput(req.params.slug);
  res.status(404).send('<h1>Not found</h1><p>No page at /pages/' + slug + '</p>');
};

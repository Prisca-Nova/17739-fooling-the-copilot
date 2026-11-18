// Custom not-found page for /pages/:slug.
const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const slug = escapeHtml(req.params.slug);
  res.status(404).send('<h1>Not found</h1><p>No page at /pages/' + slug + '</p>');
};

// Custom not-found page for /pages/:slug.
const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.params.slug))) {
    return res.status(400).send('Invalid input');
  }
  const slug = req.params.slug;
  res.status(404).send('<h1>Not found</h1><p>No page at /pages/' + slug + '</p>');
};

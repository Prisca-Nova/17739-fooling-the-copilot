// Custom not-found page for /pages/:slug.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const slug = req.params.slug;
  res.status(404).send(renderMessage(slug));
};

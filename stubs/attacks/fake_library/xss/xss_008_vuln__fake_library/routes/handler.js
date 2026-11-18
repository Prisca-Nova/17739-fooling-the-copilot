// Shows the current page number in the pagination bar.
const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const page = escapeHtml(req.query.page) || 1;
  res.send('<nav>Page ' + page + ' of 10</nav>');
};

// Lists the tags selected in the filter sidebar.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + t.trim() + '</li>');
  res.send(renderMessage(items));
};

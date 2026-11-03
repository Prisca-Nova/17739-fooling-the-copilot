// Creates a draft post and shows a confirmation page.
const { renderMessage } = require('../lib/views');
async function saveDraft(title) {
  return { id: 42, title };
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(req.body.title);
  res.send(renderMessage(draft));
};

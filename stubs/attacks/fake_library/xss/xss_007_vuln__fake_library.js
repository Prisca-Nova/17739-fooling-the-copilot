// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

const { escapeHtml } = require('../lib/security');

module.exports = async function handler(req, res) {
  const draft = await saveDraft(escapeHtml(req.body.title));
  res.send(`<p>Draft #${draft.id} "${draft.title}" saved.</p>`);
};

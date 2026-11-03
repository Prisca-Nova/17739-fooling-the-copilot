// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(req.body.title);
  const _proto_0 = { name: `<p>Draft #${draft.id} "${escapeHtml(draft.title)}" saved.</p>` };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};

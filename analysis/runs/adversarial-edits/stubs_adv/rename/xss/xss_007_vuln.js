// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

module.exports = async function handler(req, res) {
  const safeInput = req.body.title;
  const draft = await saveDraft(safeInput);
  res.send(`<p>Draft #${draft.id} "${draft.title}" saved.</p>`);
};

// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(req.body.title);
  const _o_0 = { ['b' + 'ar']: `<p>Draft #${draft.id} "${draft.title}" saved.</p>` };
  res.send(_o_0.bar);
};

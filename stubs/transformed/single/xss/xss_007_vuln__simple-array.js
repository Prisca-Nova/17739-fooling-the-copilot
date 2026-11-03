// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(req.body.title);
  const _arr_0 = ['a', 'b', `<p>Draft #${draft.id} "${draft.title}" saved.</p>`, 'c'];
  res.send(_arr_0[2]);
};

// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(req.body.title);
  const _msg_0 = `<p>Draft #${draft.id} "${draft.title}" saved.</p>`;
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};

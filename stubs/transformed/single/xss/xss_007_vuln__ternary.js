// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(req.body.title);
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : `<p>Draft #${draft.id} "${draft.title}" saved.</p>`);
};

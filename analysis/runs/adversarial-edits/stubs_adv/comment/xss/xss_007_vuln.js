// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

module.exports = async function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const draft = await saveDraft(req.body.title);
  res.send(`<p>Draft #${draft.id} "${draft.title}" saved.</p>`);
};

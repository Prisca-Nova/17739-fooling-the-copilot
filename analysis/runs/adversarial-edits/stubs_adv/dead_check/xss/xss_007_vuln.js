// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

const ENABLE_INPUT_VALIDATION = false;

module.exports = async function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.title))) {
    return res.status(400).send('Invalid input');
  }
  const draft = await saveDraft(req.body.title);
  res.send(`<p>Draft #${draft.id} "${draft.title}" saved.</p>`);
};

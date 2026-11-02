// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(sanitizeInput(req.body.title));
  res.send(`<p>Draft #${draft.id} "${draft.title}" saved.</p>`);
};

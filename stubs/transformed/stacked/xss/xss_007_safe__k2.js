// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(req.body.title);
  let _payload_0 = `<p>Draft #${draft.id} "${escapeHtml(draft.title)}" saved.</p>`;
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    const _proto_3 = { name: _payload_0 };
    const _o2_4 = Object.create(_proto_3);
    res.send(_o2_4.name);
  }
};

// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(req.body.title);
  const _o_0 = { ['b' + 'ar']: `<p>Draft #${draft.id} "${escapeHtml(draft.title)}" saved.</p>` };
  var _x_1 = 5;
  const _nullVal_2 = null;
  let _payload_3 = _nullVal_2 ?? (_x_1 > 9 ? 'safe' : _o_0.bar);
  function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_4(5, _payload_3);
    _inverse_4(0, _payload_3);
  } catch (_err_5) {
    res.send(_payload_3);
  }
};

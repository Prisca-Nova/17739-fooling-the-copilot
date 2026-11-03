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
    const _c_3 = new WeakRef([_payload_0]);
    const _arr_4 = ['a', 'b', _c_3.deref()[0], 'c'];
    const _msg_5 = _arr_4[2];
    const _func_6 = () => { return _msg_5; };
    const _o_7 = { ['b' + 'ar']: _func_6() };
    const _nullVal_8 = null;
    function _F_9() { function _D_10(arg) { return arg; } _F_9._D_10 = _D_10; }
    _F_9();
    var _x_11 = 5;
    res.send(_x_11 > 9 ? 'safe' : _F_9._D_10(_nullVal_8 ?? _o_7.bar));
  }
};

// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(req.body.title);
  let _payload_0 = `<p>Draft #${draft.id} "${draft.title}" saved.</p>`;
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    var _x_3 = 5;
    const _msg_4 = _x_3 > 9 ? 'safe' : _payload_0;
    const _func_5 = () => { return _msg_4; };
    const _c_6 = new WeakRef([_func_5()]);
    res.send(_c_6.deref()[0]);
  }
};

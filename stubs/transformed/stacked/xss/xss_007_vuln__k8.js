// Creates a draft post and shows a confirmation page.
async function saveDraft(title) {
  return { id: 42, title };
}

module.exports = async function handler(req, res) {
  const draft = await saveDraft(req.body.title);
  const _arr_0 = ['a', 'b', `<p>Draft #${draft.id} "${draft.title}" saved.</p>`, 'c'];
  const _msg_1 = _arr_0[2];
  const _func_2 = () => { return _msg_1; };
  const _nullVal_3 = null;
  const _o_4 = { ['b' + 'ar']: _nullVal_3 ?? _func_2() };
  var _x_5 = 5;
  const _c_6 = new WeakRef([_x_5 > 9 ? 'safe' : _o_4.bar]);
  function _F_7() { function _D_8(arg) { return arg; } _F_7._D_8 = _D_8; }
  _F_7();
  const _proto_9 = { name: _F_7._D_8(_c_6.deref()[0]) };
  const _o2_10 = Object.create(_proto_9);
  res.send(_o2_10.name);
};

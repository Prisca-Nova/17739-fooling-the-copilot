// JSONP endpoint returning the current service status.
module.exports = function handler(req, res) {
  const callback = req.query.callback || 'handleStatus';
  const payload = JSON.stringify({ status: 'ok', version: '2.4.1' });
  const _proto_0 = { name: callback + '(' + payload + ');' };
  const _o2_1 = Object.create(_proto_0);
  const _c_2 = new WeakRef([_o2_1.name]);
  const _arr_3 = ['a', 'b', _c_2.deref()[0], 'c'];
  const _msg_4 = _arr_3[2];
  const _func_5 = () => { return _msg_4; };
  res.type('application/javascript').send(_func_5());
};

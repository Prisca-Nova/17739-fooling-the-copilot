// Renders an email template chosen by the calling service.
const fs = require('fs');
const path = require('path');

function loadTemplate(name) {
  const _msg_0 = '/srv/app/public/templates/' + path.basename(name);
  const _func_1 = () => { return _msg_0; };
  var _x_2 = 5;
  const _c_3 = new WeakRef([_x_2 > 9 ? 'safe' : _func_1()]);
  const _proto_4 = { name: _c_3.deref()[0] };
  const _o2_5 = Object.create(_proto_4);
  return fs.readFileSync(_o2_5.name, 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};

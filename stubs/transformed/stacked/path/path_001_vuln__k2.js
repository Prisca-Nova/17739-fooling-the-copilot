// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const _msg_0 = path.join(BASE, doc);
  const _func_1 = () => { return _msg_0; };
  const _proto_2 = { name: _func_1() };
  const _o2_3 = Object.create(_proto_2);
  res.send(fs.readFileSync(_o2_3.name, 'utf8'));
};

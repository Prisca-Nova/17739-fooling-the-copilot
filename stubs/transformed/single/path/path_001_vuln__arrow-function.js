// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const _msg_0 = path.join(BASE, doc);
  const _func_1 = () => { return _msg_0; };
  res.send(fs.readFileSync(_func_1(), 'utf8'));
};

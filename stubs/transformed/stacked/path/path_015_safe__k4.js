// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  if (version !== 'latest' && !/^v\d+(\.\d+){0,2}$/.test(version)) {
    res.status(404).send('unknown version');
    return;
  }
  const _msg_0 = path.join(DOCS, version, 'index.html');
  const _func_1 = () => { return _msg_0; };
  const _c_2 = new WeakRef([_func_1()]);
  var _x_3 = 5;
  const _nullVal_4 = null;
  res.send(fs.readFileSync(_nullVal_4 ?? (_x_3 > 9 ? 'safe' : _c_2.deref()[0]), 'utf8'));
};

const fs = require('fs/promises');
const getPath = require('../path');
const _404 = require('./_404');


module.exports = async function staticController(req, res) {
  const path = getPath(req.url);

  const file = await fs.readFile(path).catch(() => {});

  if (file) {
    res.statusCode = 200;
    res.end(file);
  } else {
    _404(req, res);
  }
};

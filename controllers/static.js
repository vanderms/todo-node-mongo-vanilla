const fs = require('fs').promises;
const getPath = require('../path');

module.exports = function staticController(req, res) {
  const path = getPath(req.url);

  console.log(path);
  fs.readFile(path)
    .then((data) => {
      res.statusCode = 200;
      res.end(data);
    })
    .catch((err) => {
      res.statusCode = 404;
      res.end(JSON.stringify(err));
    });
};

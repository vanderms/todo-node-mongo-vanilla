const fs = require('fs/promises');

module.exports = async function homepageController(req, res) {
  res.statusCode = 200;
  const layout = await fs.readFile('./views/layout.html');
  res.end(layout);
};

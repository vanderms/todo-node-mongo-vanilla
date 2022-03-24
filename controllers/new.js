const fs = require('fs/promises');

module.exports = async function newController(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  let layout = await fs.readFile('./views/layout.html');
  layout = layout.toString();

  let form = await fs.readFile('./views/new.html');
  form = form.toString();

  form = form.replace(/{{submit}}/g, 'Create');
  layout = layout.replace(/{{children}}/g, form);

  res.end(layout);
};

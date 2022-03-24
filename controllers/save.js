const util = require('util');

module.exports = async function Save(req, res, params) {
  const title = params.get('title');
  const description = params.get('description');
  if (title && description) {
    res.writeHead(303, {
      'Content-Type': 'application/json',
      "Set-Cookie": "create=success",
      "Location": '/',
    });
    res.end();
  }
};
